const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;

data = {
    "0":{
        "name":"MRT วงศ์สว่าง",
        "latlng":[13.82799, 100.52786],
        "time":["05:30","23:00"],
        "amount":20,
        "mostPeopleWhen":"เช้า",
        "credit":"คุณโหน่ง สยุมพร",
        "price":{
            "วัดทอง":[20,25,30],
            "วัดเลียบ":[20,25,30],
            "ตลาดบางซ่อน":25,
            "วัดเซิงหวาย":40,
            "รพ.เกษมราษฎร์-ประชาชื่น":30,
            "วัดน้อย":[40,50],
            "ตลาดเตาปูน":40,
            "บิ๊กซี นนทบุรี":40,
            "โลตัส ประชาชื่น":50,
            "สน.ประชาชื่น":50,
            "ร.ร.สตรีนนท์":50,
            "วัดเสมียน":60,
            "ไทยพาณิชย์":60,
            "เมเจอร์-รัชโยธิน":[60,70],
            "ท่าน้ำนนท์":70,
            "หมอชิต":80
        }
    },
    "1":{
        "name":"ปากซอยวงศ์สว่าง 11",
        "latlng":[13.82129, 100.52054],
        "time":null,
        "amount":null,
        "mostPeopleWhen":null,
        "credit":null,
        "price":null
    },
    "2":{
        "name":"ประตูหน้า มจพ.",
        "latlng":[13.81867, 100.51425],
        "time":null,
        "amount":null,
        "mostPeopleWhen":null,
        "credit":null,
        "price":null
    },
    "3":{
        "name":"ซอยพิบูลสงคราม 22",
        "latlng":[13.83219, 100.50090],
        "time":null,
        "amount":null,
        "mostPeopleWhen":null,
        "credit":null,
        "price":null
    },
    "4":{
        "name":"ซอยพิบูลสงคราม 22/22",
        "latlng":[13.83207, 100.51337],
        "time":null,
        "amount":null,
        "mostPeopleWhen":null,
        "credit":null,
        "price":null
    },
    "5":{
        "name":"ตลาด NorthZone ตรงข้าม 7-11",
        "latlng":[13.82728, 100.51428],
        "time":null,
        "amount":null,
        "mostPeopleWhen":null,
        "credit":null,
        "price":null
    },
    "6":{
        "name":"Zoom Cafe",
        "latlng":[13.82746, 100.51469],
        "time":null,
        "amount":null,
        "mostPeopleWhen":null,
        "credit":null,
        "price":null
    },
    "7":{
        "name":"หน้าหอ @sign",
        "latlng":[13.82451, 100.51605],
        "time":null,
        "amount":null,
        "mostPeopleWhen":null,
        "credit":null,
        "price":null
    },
    "8":{
        "name":"ประตูหลัง มจพ.",
        "latlng":[13.82244, 100.51509],
        "time":null,
        "amount":null,
        "mostPeopleWhen":null,
        "credit":null,
        "price":null
    }
};

app.use(cors());

app.get("/api/fetchData", (req, res) =>{
    res.json(data);
});

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
});
