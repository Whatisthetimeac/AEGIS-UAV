#!/usr/bin/env python3
"""Serve AEGIS locally and run a fixed, allowlisted MATLAB simulation endpoint.
Standard library only. No arbitrary shell commands or uploaded executable code.
"""
import argparse
import functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import math
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import threading
import time
from urllib.parse import urlsplit

ROOT=Path(__file__).resolve().parents[1]
RUN_LOCK=threading.Lock()
MISSIONS={'iecon','power','coastal','rescue','urban'}

def matlab_binary():
    configured=os.environ.get('MATLAB_BIN')
    return shutil.which(configured or 'matlab')

def validate_request(data):
    if not isinstance(data,dict) or data.get('mission') not in MISSIONS:
        raise ValueError('Escolha iecon, power, coastal, rescue ou urban.')
    if data['mission']!='iecon':
        points=data.get('waypoints');alt=data.get('altitude_m')
        def numeric(v):return isinstance(v,(float,int)) and not isinstance(v,bool) and math.isfinite(v)
        if not isinstance(points,list) or not 2<=len(points)<=16:
            raise ValueError('Informe entre 2 e 16 waypoints.')
        if any(not isinstance(p,list) or len(p)!=2 or any(not numeric(v) or abs(v)>10000 for v in p) for p in points):
            raise ValueError('Waypoints exigem coordenadas locais finitas até 10 km.')
        if not numeric(alt) or not 1<=alt<=2000:raise ValueError('Altitude fora do intervalo de 1 a 2000 m.')
    return data

def mquote(value):return "'"+str(value).replace("'","''")+"'"

def execute_matlab(data):
    binary=matlab_binary()
    if not binary:raise RuntimeError('MATLAB não encontrado. Configure MATLAB_BIN com o executável instalado.')
    start=time.monotonic()
    with tempfile.TemporaryDirectory(prefix='aegis-matlab-') as tmp:
        folder=Path(tmp);output=folder/'result.csv';config=folder/'mission.json'
        config.write_text(json.dumps(data),encoding='utf-8')
        command=f"addpath({mquote(ROOT/'matlab')}); "
        if data['mission']=='iecon':
            command+=f"reproduce_iecon_results({mquote(ROOT/'data/iecon_model_replay_1806.csv')},{mquote(output)});"
        else:command+=f"aegis_uav_simulate({mquote(data['mission'])},{mquote(output)},{mquote(config)});"
        proc=subprocess.run([binary,'-batch',command],cwd=tmp,capture_output=True,text=True,timeout=180,check=False)
        if proc.returncode or not output.is_file():
            raise RuntimeError('MATLAB encerrou sem resultado. '+(proc.stderr or proc.stdout)[-1200:])
        return {'csv':output.read_text(encoding='utf-8-sig'),'engine':'MATLAB','elapsed_s':round(time.monotonic()-start,2)}

class Handler(SimpleHTTPRequestHandler):
    def reply(self,status,payload):
        raw=json.dumps(payload,ensure_ascii=False).encode()
        self.send_response(status);self.send_header('Content-Type','application/json; charset=utf-8')
        self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(raw)));self.end_headers();self.wfile.write(raw)
    def trusted_request(self):
        port=self.server.server_port
        hosts={f'127.0.0.1:{port}',f'localhost:{port}'}
        if self.headers.get('Host') not in hosts:return False
        origin=self.headers.get('Origin')
        return origin is None or origin in {f'http://{h}' for h in hosts}
    def do_GET(self):
        if not self.trusted_request():return self.reply(403,{'error':'Abra o endereço local do iniciador.'})
        if self.path=='/api/status':return self.reply(200,{'matlab_available':bool(matlab_binary()),'engine':'MATLAB local'})
        if any(part.startswith('.') for part in urlsplit(self.path).path.split('/') if part):return self.reply(404,{'error':'Não encontrado'})
        return super().do_GET()
    def do_POST(self):
        if not self.trusted_request():return self.reply(403,{'error':'Origem não autorizada.'})
        if self.path!='/api/simulate':return self.reply(404,{'error':'Rota inexistente.'})
        if self.headers.get_content_type()!='application/json':return self.reply(415,{'error':'Use application/json.'})
        try:
            size=int(self.headers.get('Content-Length','0'))
            if not 0<size<=16000:raise ValueError('Corpo fora do limite.')
            data=validate_request(json.loads(self.rfile.read(size)))
        except (ValueError,UnicodeError) as e:return self.reply(400,{'error':str(e)})
        if not RUN_LOCK.acquire(blocking=False):return self.reply(409,{'error':'Uma simulação já está em execução.'})
        try:self.reply(200,execute_matlab(data))
        except subprocess.TimeoutExpired:self.reply(504,{'error':'MATLAB excedeu o limite de 180 s.'})
        except (RuntimeError,OSError) as e:self.reply(503,{'error':str(e)})
        finally:RUN_LOCK.release()

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=8765);args=parser.parse_args()
    handler=functools.partial(Handler,directory=str(ROOT))
    server=ThreadingHTTPServer(('127.0.0.1',args.port),handler)
    print(f'AEGIS-UAV: http://127.0.0.1:{args.port}',flush=True)
    print('MATLAB disponível' if matlab_binary() else 'MATLAB não encontrado: painel e importação CSV disponíveis.',flush=True)
    try:server.serve_forever()
    except KeyboardInterrupt:pass
    finally:server.server_close()
if __name__=='__main__':main()
