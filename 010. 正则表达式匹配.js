/**
 * Created by admin on 2018/7/22.
 */
/**给定一个字符串 (s) 和一个字符模式 (p)。实现支持 '.' 和 '*' 的正则表达式匹配。
 * '.' 匹配任意单个字符。
 * '*' 匹配零个或多个前面的元素。
 * 匹配应该覆盖整个字符串 (s) ，而不是部分字符串。
 *
 * 说明:
 * s 可能为空，且只包含从 a-z 的小写字母。
 * p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
 *
 * 示例 1:
 * s = "aa"
 * p = "a"
 * 输出: false
 * 解释: "a" 无法匹配 "aa" 整个字符串。
 *
 * 示例 2:
 * s = "aa"
 * p = "a*"
 * 输出: true
 * 解释: '*' 代表可匹配零个或多个前面的元素, 即可以匹配 'a' 。因此, 重复 'a' 一次, 字符串可变为 "aa"。
 *
 * 示例 3:
 * s = "ab"
 * p = ".*"
 * 输出: true
 * 解释: ".*" 表示可匹配零个或多个('*')任意字符('.')。
 *
 * 示例 4:
 * s = "aab"
 * p = "c*a*b"
 * 输出: true
 * 解释: 'c' 可以不被重复, 'a' 可以被重复一次。因此可以匹配字符串 "aab"。
 *
 * 示例 5:
 * s = "mississippi"
 * p = "mis*is*p*."
 * 输出: false
 */

/**题目基本同044，思路一致采用回溯法解决
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    if (s === p) return true;

    var i = 0, m = s.length;
    var j = 0, n = p.length;
    var lastStar, lastStarI;
    var str = ''

    while (i < m) {
        console.log(i, j, s[i], p[j], '----', str)
        if (s[i] === p[j] || p[j] === '.') {
            str += s[i]
            i++, j++;
            continue;
        }

        if (p[j] === '*') {
            while (p[j + 1] === '*') {  //  多个 * 视为1个 *
                j++;
            }
            lastStar = j;

            if (p[j - 1] === '.' && j + 1 === n) return true;   //  以 .* 结尾，可以匹配任意字符串

            if (s[i] === p[j + 1]) {    // * 匹配1个p[j - 1]
                j++;
                // str += s[i];
                continue;
            }

            if (s[i] === p[j - 1]) {    //  * 匹配1个以上p[i - 1]
                str += s[i];
                i++;
                continue;
            }

            // if (s[i] === p[j - 1] || p[j - 1] === '.') {    //  *前面的一个字符与s[i]匹配 || *前面的一个字符为 .
            //     str += s[i]
            //     i++;
            //     j++;
            //     continue;
            // }

        }

        if (s[i] !== p[j] && p[j + 1] === '*') {    // '*'表示p[j]字符为0个
            lastStar = j + 1;
            j += 2;
            continue;
        }

        if (typeof lastStar !== 'undefined') {  //  以上全部不匹配，而且出现过*，则需要回溯
            //  回溯的情况
            // if (s[i] !== p[j] && )
        }

    }

    console.log(str, j)
    return s === str;
};

console.log(isMatch('aaaab', 'aa*b'))
// console.log(isMatch('aab', '.*'))
// console.log(isMatch('aab', 'c*a*b'))
// console.log(isMatch('ab', '.*c'), 'x')
// console.log(isMatch('mississippi', 'mis*is*p*.'), 'x')
// console.log(isMatch('mississippi', 'mis*is*ip*.'))