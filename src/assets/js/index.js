/**
 * 价格(保留小数点后两位：6.00)
 * @param {*} s
 */
export function isPrice (s) {
    return /^(?:0\.\d{0,1}[1-9]|(?!0)\d{1,6}(?:\.\d{0,1}[1-9])?)$/.test(s)
}
