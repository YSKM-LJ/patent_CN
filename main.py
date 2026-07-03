import requests
from lxml import etree
import execjs

session = requests.session()
headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "http://epub.cnipa.gov.cn/",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36"
}
url = "http://epub.cnipa.gov.cn/"
response1 = session.get(url, headers=headers, verify=False)

html = etree.HTML(response1.text)
content = html.xpath("//meta[@id='K5MK4FPPNWrv']/@content")[0]
encrypt_code = html.xpath("//script[1]/text()")[0]
decrypt_js_url = url + html.xpath("//script[2]/@src")[0]
decrypt_code = session.get(decrypt_js_url, headers=headers, verify=False).text
with open("./js_code.js", "w", encoding="utf-8") as f:
    f.write(encrypt_code + "\n" + decrypt_code)
with open("./main.js", "r", encoding="utf-8") as f:
    ctx = execjs.compile(f.read())
    NOh8RTWx6K2dT = ctx.call('get_NOh8RTWx6K2dT')

session.cookies['NOh8RTWx6K2dT'] = NOh8RTWx6K2dT
# session.cookies['NOh8RTWx6K2dT'] = "0xbxdSYcnCdwx24fqBE4BwfxojwftKewQkSXcqPrZi8Kknxpk1Ark_2qGlP6iOjYDHdLLBPPyK6I1MnMO6k0dEqoE7JkftpTcXzEeUl5qBo4ZjTVts.KkvYCpXFYpnBDdVxHAi.jzpHF1Lhkhf1Hdvf_m9Wi07YnGbsb3cI3TyOFL7x_PHzmgKzDeyIYYIzZt0c92QBd.sR2mvKwfYaQFFhbhwgfHUFgIbyO4fMSk1YA"
response2 = session.get('http://epub.cnipa.gov.cn/Index', headers=headers, verify=False)

print(response2.status_code)
print(response2.text)