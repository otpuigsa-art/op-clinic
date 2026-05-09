#!/usr/bin/env python3
"""Local preview server with clean URL support.
Usage: python3 serve.py
"""
import http.server, os

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) and not self.path.endswith('/'):
            html = path + '.html'
            if os.path.exists(html):
                self.path = self.path + '.html'
        super().do_GET()

if __name__ == '__main__':
    print('Serving at http://localhost:8000')
    print('Press Ctrl+C to stop.')
    http.server.HTTPServer(('', 8000), Handler).serve_forever()
