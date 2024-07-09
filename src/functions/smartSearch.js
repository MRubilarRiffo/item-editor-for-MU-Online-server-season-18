const { infoItem } = require("./infoItem");

const visualizeBaul = (baulArray) => {
    for (let y = 0; y < 15; y++) {
        let row = "";
        for (let x = 0; x < 8; x++) {
            row += baulArray[x + y * 8] ? "1" : "0";
        }
        console.log(row);
    }
};

// const smartSearch = async (warehouse, itemX, itemY) => {
//     if (warehouse.substring(0, 2) === "0x") {
//         warehouse = warehouse.substring(2);
//     }

//     let items = Array(120).fill(0);
//     let itemsm = Array(120).fill(1);
//     // console.log(warehouse);
    
//     for (let i = 0; i < 120; i++) {
//         let _item = warehouse.substring(32 * i, 32 * (i + 1));
//         // console.log(i + 1, "    |   ", _item);
//         let sy = parseInt(_item.substring(0, 2), 16);
//         let ioo = parseInt(_item.substring(14, 16), 16);
//         let type = parseInt(_item.substring(18, 19), 16);
        
//         if (ioo > 128) {
//             sy += 256;
//             ioo -= 128;
//         };
        
//         const info = await infoItem(type, sy);
        
//         let res = info ? { X: parseInt(info.Width), Y: parseInt(info.Height) } : { X: 0, Y: 0 };
//         // console.log(res);
//         for (let y = 0; y < res.Y; y++) {
//             for (let x = 0; x < res.X; x++) {
//                 items[i + x + y * 8] = 1;
//             };
//         };
//     };
    
//     visualizeBaul(items);

//     let spacerq = {};
//     for (let y = 0; y < itemY; y++) {
//         for (let x = 0; x < itemX; x++) {
//             spacerq[x + 8 * y] = true;
//         };
//     };

//     for (let i = 0; i < 120; i++) {
//         if (spacerq[i] !== undefined) {
//             itemsm[i] = 0;
//         };
//     };

//     let useforlength = itemsm.slice(0, 120).join("");
//     let findslotlikethis = new RegExp("^" + useforlength.replace(/1/g, "[01]") + "$", "i");

//     for (let i = 0, nx = 0, ny = 0; i < 120; i++, nx++) {
//         if (nx === 8) {
//             ny++;
//             nx = 0;
//         };

//         if (
//             findslotlikethis.test(items.slice(i, i + useforlength.length).join("")) &&
//             itemX + nx < 9 &&
//             itemY + ny < 16
//         ) {
//             return i;
//         };
//     };

//     return 1337;
// };

const smartSearch = async (warehouse, itemX, itemY) => {
    if (warehouse.substring(0, 2) === "0x") {
        warehouse = warehouse.substring(2);
    }

    let items = "0".repeat(120);
    let itemsm = "1".repeat(120);

    let i = 0;
    
    while (i < 120) {
        let _item = warehouse.substring(32 * i, 32 * (i + 1));
        let sy = parseInt(_item.substring(0, 2), 16);
        let ioo = parseInt(_item.substring(14, 16), 16);
        let type = parseInt(_item.substring(18, 19), 16);
        console.log(_item);
        if (ioo > 128) {
            sy += 256;
            ioo -= 128;
        }

        const info = await infoItem(type, sy);

        let res = info ? { X: parseInt(info.Width), Y: parseInt(info.Height) } : { X: 0, Y: 0 };

        let y = 0;
        
        while (y < res.Y) {
            y++;
            let x = 0;
            
            while (x < res.X) {
                items = items.substring(0, i + x + (y - 1) * 8) + "1" + items.substring(i + x + (y - 1) * 8 + 1);
                x++;
            }
        }
        
        i++;
    }

    
    let spacerq = {};
    
    let y = 0;
    while (y < itemY) {
        y++;
        let x = 0;
        
        while (x < itemX) {
            x++;
            spacerq[x + 8 * (y - 1)] = true;
        }
    }
    
    visualizeBaul(items)
    let walked = 0;
    i = 0;
    let last = i;
    while (i < 120) {
        if (spacerq[i] !== undefined) {
            itemsm = itemsm.substring(0, i - 1) + "0" + itemsm.substring(i);
            last = i;
            walked++;
        }
        
        if (walked === Object.keys(spacerq).length) {
            i = 119;
        }
        
        i++;
    }
    
    let useforlength = itemsm.substring(0, last);
    let findslotlikethis = new RegExp("^" + useforlength.replace(/1/g, "[01]") + "$", "i");
    i = 0;
    let nx = 0;
    let ny = 0;
    
    while (i < 120) {
        if (nx === 8) {
            ny++;
            nx = 0;
        }
        
        if (findslotlikethis.test(items.substring(i, i + useforlength.length)) && itemX + nx < 9 && itemY + ny < 16) {
            return i;
        }
        
        i++;
        nx++;
    }
    
    return 1337;
};

module.exports = { smartSearch };