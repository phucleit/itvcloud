
# Setup scloud app
git clone https://github.com/phucleit/itvcloud.
npm install.
npm start.

# Sửa lỗi package (không cần thiết)
Thay đổi "start": "set PORT=4000 && react-scripts start" thành "start": "react-scripts --openssl-legacy-provider start"