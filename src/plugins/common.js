/**
 * 数值转化万、亿单位
 * 参数1：数值，参数2：小数点位数
 */
const transNumber = function (num, decimalDigit = 0) {
  num = parseFloat(num) || 0;
  if (decimalDigit == null) {
    decimalDigit = 0;
  }
  if (num >= 10000 && num < 100000000) {
    return (num / 10000).toFixed(decimalDigit) + '万';
  } else if (num >= 100000000) {
    return (num / 100000000).toFixed(decimalDigit) + '亿';
  } else {
    return num.toFixed(decimalDigit);
  }
};

/**
 * 切换元素样式
 * 参数1：元素，参数2：样式类
 */
const toggleClass = function (el, className) {
  let classList = [...el.classList];
  if (classList.includes(className)) {
    el.classList.remove(className);
  } else {
    el.classList.add(className);
  }
};

/**
 * 图片转base64
 * 参数1：元素，参数2：图片路径
 */
const dealImage = function (el, imageSrc) {
  let image = new Image();
  image.crossOrigin = 'anonymous'; // 如果图片是跨域的，填上"*"或者"anonymous" 核心是请求头中包含了 Origin: "anonymous"或"*" 字段，响应头中就会附加上 Access-Control-Allow-Origin: * 字段,
  image.src = imageSrc;
  image.onload = function () {
    let ext = imageSrc.substring(imageSrc.lastIndexOf('.') + 1);
    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);
    // 这里是不支持跨域的
    let base64 = canvas.toDataURL('image/' + ext);
    return el.setAttribute('src', base64);
  };
};
/**
 * 深度合并对象
 * 参数1：源对象，参数2：目标对象
 */
const deepObjectMerge = function(FirstOBJ, SecondOBJ) {
  for (var key in SecondOBJ) {
    FirstOBJ[key] =
      FirstOBJ[key] && FirstOBJ[key].toString() === '[object Object]'
        ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key])
        : (FirstOBJ[key] = SecondOBJ[key]);
  }
  return FirstOBJ;
};

export {
  transNumber,
  toggleClass,
  dealImage,
  deepObjectMerge
};
