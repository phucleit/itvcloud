
# Setup scloud app
```shell
$ git clone https://github.com/phucleit/itvcloud
$ cd itvcloud
$ npm install
$ npm start
```

# Sửa lỗi package (không cần thiết)
Nếu bị lỗi digital envelope routines::unsupported khi start thì thay đổi 
"start": "set PORT=4000 && react-scripts start" thành "start": "react-scripts --openssl-legacy-provider start"