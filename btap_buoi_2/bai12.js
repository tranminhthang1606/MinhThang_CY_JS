let nums1 = [1,3,2];
let nums2 = [2,4,9];

const checkMiddleText = (nums1,nums2)=>{
    let mergeArr = [...nums1,...nums2];
    mergeArr.sort((a,b)=>a-b); 
    if(mergeArr.length %2==0){
        let middleLength = mergeArr.length/2;
        return (mergeArr[middleLength-1]+mergeArr[middleLength])/2;
    }else{
        return mergeArr[(mergeArr.length-1)/2]
    }
}

console.log(checkMiddleText(nums1,nums2));
