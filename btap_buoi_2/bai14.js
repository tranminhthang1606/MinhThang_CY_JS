let strs = ["flower", "flow", "flight"];

let checkCommonPrefix = (arr) => {
    let prefix = arr[0];
    let key = '';
    
    for (let i = 0; i < prefix.length; i++) {
        let filter = arr.filter((item) => item[i] == prefix[i]);     
        if (filter.length == arr.length) {
            key += prefix[i]
        }else{
            break;
        }
    }
    return key;
}
console.log(checkCommonPrefix(strs)?checkCommonPrefix(strs):'Không có tiền tố chung giữa các chuỗi.');