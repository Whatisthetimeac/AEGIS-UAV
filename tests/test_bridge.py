import importlib.util
import json
from pathlib import Path
import threading
import unittest
from unittest.mock import patch
import urllib.request
import urllib.error

spec=importlib.util.spec_from_file_location('bridge',Path(__file__).resolve().parents[1]/'scripts/serve_matlab.py')
b=importlib.util.module_from_spec(spec);spec.loader.exec_module(b)
class BridgeTests(unittest.TestCase):
 def test_request_validation(self):
  self.assertEqual(b.validate_request({'mission':'iecon'})['mission'],'iecon')
  for bad in [{'mission':'unknown'},{'mission':'power','waypoints':[[0,0]],'altitude_m':30},{'mission':'power','waypoints':[[0,0],[float('nan'),1]],'altitude_m':30},{'mission':'power','waypoints':[[0,0],[1,1]],'altitude_m':True}]:
   with self.assertRaises(ValueError):b.validate_request(bad)
 def test_missing_runtime(self):
  with patch.object(b,'matlab_binary',return_value=None):
   with self.assertRaisesRegex(RuntimeError,'MATLAB'):b.execute_matlab({'mission':'iecon'})
 def test_http_status_and_origin(self):
  server=b.ThreadingHTTPServer(('127.0.0.1',0),b.Handler)
  thread=threading.Thread(target=server.serve_forever,daemon=True);thread.start()
  base='http://127.0.0.1:'+str(server.server_port)
  try:
   with patch.object(b,'matlab_binary',return_value=None):
    with urllib.request.urlopen(base+'/api/status') as r:self.assertFalse(json.load(r)['matlab_available'])
   req=urllib.request.Request(base+'/api/simulate',data=b'{"mission":"iecon"}',headers={'Content-Type':'application/json','Origin':'https://example.com'})
   with self.assertRaises(urllib.error.HTTPError) as c:urllib.request.urlopen(req)
   self.assertEqual(c.exception.code,403)
   req=urllib.request.Request(base+'/api/simulate',data=b'{"mission":"invalid"}',headers={'Content-Type':'application/json','Origin':base})
   with self.assertRaises(urllib.error.HTTPError) as c:urllib.request.urlopen(req)
   self.assertEqual(c.exception.code,400)
  finally:server.shutdown();server.server_close();thread.join()
if __name__=='__main__':unittest.main()
