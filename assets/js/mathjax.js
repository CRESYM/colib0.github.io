/**
 * Copyright (c) 2020, RTE (http://www.rte-france.com)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Workaround to make MathJax v3 compatible with Kramdown
//     https://github.com/mathjax/MathJax/issues/2220
//     https://github.com/gettalong/kramdown/issues/651
// This issue has been fixed in new Kramdown version, but github-pages depends on an old version (https://pages.github.com/versions)

MathJax = {
    chtml: {
        scale: 0.8
    },
    options: {
        renderActions: {
            /* add a new named action not to override the original 'find' action */
            find_script_mathtex: [10, function (doc) {
                for (const node of document.querySelectorAll('script[type^="math/tex"]')) {
                    const display = !!node.type.match(/; *mode=display/);
                    const math = new doc.options.MathItem(node.textContent, doc.inputJax[0], display);
                    const text = document.createTextNode('');
                    node.parentNode.replaceChild(text, node);
                    math.start = {node: text, delim: '', n: 0};
                    math.end = {node: text, delim: '', n: 0};
                    doc.math.push(math);
                }
            }, '']
        }
    }
};
