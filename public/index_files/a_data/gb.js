var txt = {
    add: 'Add',
    cancel: 'Cancel',
    busy: 'Busy..',
    send: 'send',
    too_long: 'Sorry, your message can maximally contain 10000 characters. Delete at least',
    chars: 'characters',
    standard: 'standard',
    visual: 'visual',
    add_link: 'Add a link',
    url: 'URL',
    name_link: 'Link name',
    add_img: 'Add an image',
    img_url: 'Image URL',
    add_smiley: 'Add a smiley',
    smileys: [':)', ':D', ':lol:', ';)', ':cool:', ':o', ':(', ':nono:', ':eek:', ':mad:', ':dead:', ':cry:', ':kiss:', ':love:', ':quiet:', ':look:', ':brush:', ':cheers:', ':clown:', ':td:', ':tu:', ':hail:', ':bouncey:', ':nerd:', ':idea:', ':zzz:', ':P', ':wave:', ':whistle:', ':confused:'],
    add_video: 'Add a video',
    video_source: 'Choose the website where the video is placed on',
    video_url: 'Video URL',
    choose_font: 'Choose font',
    choose_size: 'Choose font size',
    sizes: ['smallest', 'small', 'medium', 'big', 'biggest'],
    choose_color: 'Choose text color',
    verify: 'Verify code',
    copy_code: 'Type in the characters you see in the picture below',
    why: 'Why',
    unreadable: 'Can\'t read the text',
    retry: 'Try another'
};

Function.prototype.bind = function (obj) {
    var o = this;
    return function () {
        return o.apply(obj, arguments);
    }
};
var fx = {
    trans: function() {}
};
fx.trans.prototype = {
    init: function (el, options) {
        this.el = document.getElementById(el);
        this.el.style.overflow = "hidden";
        this.options = options;
    },
    increase: function () {
        this.el.style.height = this.now + "px";
    },
    toggle: function () {
        this.el.style.display = 'block';
        if (this.el.offsetHeight > 0) {
            this.custom(this.el.offsetHeight, 0);
        } else {
            this.custom(0, this.el.scrollHeight);
        }
        return false;
    },
    step: function () {
        var time = (new Date).getTime();
        if (time >= this.options.duration + this.startTime) {
            this.now = this.to;
            clearInterval(this.timer);
            if (this.to > 0) {
                this.el.style.display = 'inline';
            }
            this.timer = null;
        } else {
            var Tpos = (time - this.startTime) / (this.options.duration);
            this.now = ((-Math.cos(Tpos * Math.PI) / 2) + 0.5) * (this.to - this.from) + this.from;
            this.increase();
        }
    },
    custom: function (from, to) {
        if (this.timer != null) {
            return;
        }
        this.from = from;
        this.to = to;
        this.startTime = (new Date).getTime();
        this.timer = setInterval(this.step.bind(this), 13);
    },
    hide: function () {
        if (!document.getElementById('error')) {
            this.now = 0;
            this.increase();
        }
    },
    clearTimer: function () {
        clearInterval(this.timer);
        this.timer = null;
    }
};

var ib;
var d = document;

function init() {
    ib = new fx.trans();
    ib.init('add_msg', {duration: 500});
    ib.hide();
}

jce = {
    box: [],
    videoPlatforms: {
        youtube: {
            label: 'YouTube',
            patterns: [
                /youtube.com\/watch\?v=([a-z0-9-_]+)/i,
                /youtu.be\/([a-z0-9-_]+)/i
            ]
        },
        vimeo: {
            id: 'vimeo',
            label: 'Vimeo',
            patterns: [
                /vimeo.com\/.*?\/([0-9]+)/i
            ]
        },
        dailymotion: {
            label: 'Dailymotion',
            patterns: [
                /dailymotion.com\/video\/(.+?)_/i
            ]
        },
        vine: {
            label: 'Vine',
            patterns: [
                /vine.co\/v\/([^\/]+)/i
            ]
        },
        yahoo: {
            id: 'yahoo',
            label: 'Yahoo screen',
            patterns: [
                /yahoo.com\/(.+?)\.html/i
            ]
        }
    },
    create: function () {
        var btns = [];
        var ubbBar = '';
        if (use_codes) {
            btns.push('italic', 'bold', 'color', 'size', 'font', 'link', 'image', 'video');
        }
        if (use_smilies) {
            btns.push('smiley');
        }
        for (i = 0; i < btns.length; i++) {
            btn = btns[i];
            ubbBar += '<button type="button" unselectable="on" onclick="jce.' + ((btn == 'italic' || btn == 'bold') ? 'insertFormat' : 'showBox') + '(\'' + btn + '\');"><img src="img/' + btn + '.gif"/></button>';
        }
        add($('jce'), '<div class="ubb">' + ubbBar + '</div>', true, false);
        add($('jce'), '<div id="box"></div>', true);

        this.inputObj = $('msg');
        this.boxObj = $('box');
        this.boxCSS = this.boxObj.style;
    },
    setContent: function (type, content) {
        this.inputObj.value = content;
    },
    hideBox: function () {
        if (this.openBox == 'captcha') {
            document.form.smsg.value = txt['send'];
        }
        this.boxCSS.display = 'none';
        this.openBox = false;
        this.Focus();
    },
    showBox: function (type) {
        if (this.openBox == type) {
            this.hideBox();
            return false;
        }
        if (!this.box[type]) {
            switch (type) {
                case 'link':
                    this.saveBox(type, txt['add_link'], '<p>' + txt['url'] + ':</p><input type="text" name="link_url" value="http://" /><p>' + txt['name_link'] + ':</p><input type="text" name="link_name" value="" /><div class="bottom"><button type="button" onclick="jce.insertObject(\'link\',[d.form.link_url.value,d.form.link_name.value]);">' + txt['add'] + '</button> &nbsp; <button type="button" onclick="jce.hideBox();">' + txt['cancel'] + '</button></div>');
                    break;
                case 'image':
                    this.saveBox(type, txt['add_img'], '<p>' + txt['img_url'] + ':</p><input type="text" name="image_url" value="http://" /><div class="bottom"><button type="button" onclick="jce.insertObject(\'image\',d.form.image_url.value);">' + txt['add'] + '</button> &nbsp; <button type="button" onclick="jce.hideBox();">' + txt['cancel'] + '</button></div>');
                    break;
                case 'smiley':
                    var smileyTags = txt['smileys'];
                    var smileyNames = ['smile', 'biggrin', 'laugh', 'wink', 'cool', 'blush', 'frown', 'nono', 'eek', 'mad', 'dead', 'cry', 'kiss', 'rose', 'quiet', 'look', 'brushteeth', 'cheers', 'clown', 'notgood', 'perfect', 'hail', 'bouncey', 'nerd', 'idea', 'sleep', 'tongue', 'wave', 'whissle', 'confused'];
                    var smiliesContent = '';
                    for (var i = 0; i < smileyTags.length; i++) {
                        smiliesContent += '<a href="#" onclick="return jce.insertObject(\'smiley\',[\'' + smileyTags[i] + '\',\'' + smileyNames[i] + '\']);"><img src="img/' + smileyNames[i] + '.gif" border="0" style="padding:2px;" unselectable="on"/></a>';
                    }
                    this.saveBox(type, txt['add_smiley'], smiliesContent);
                    break;
                case 'video':
                    var platformRadioList = '';
                    var platform, id;
                    for(id in this.videoPlatforms) {
                        if(this.videoPlatforms.hasOwnProperty(id)) {
                            platform = this.videoPlatforms[id];
                            platformRadioList += '<label><input type="radio" name="source" value="' + id + '" />' + platform.label + '</label> ';
                        }
                    }
                    this.saveBox(type, txt['add_video'], '<p>' + txt['video_source'] + ':</p>' + platformRadioList + '<p>' + txt['video_url'] + ': <input type="text" name="url" value="" size="40"/></p><div class="bottom"><button type="button" onclick="jce.insertObject(\'video\',[d.form.url.value,d.form.source]);">' + txt['add'] + '</button> &nbsp; <button type="button" onclick="jce.hideBox();">' + txt['cancel'] + '</button></div>');
                    break;
                case 'font':
                    var fontNames = ['arial', 'times new roman', 'comic sans ms', 'tahoma', 'verdana', 'trebuchet ms', 'georgia'];
                    var fontsContent = '<table><tr>';
                    for (i = 0; i < fontNames.length; i++) {
                        fontsContent += '<td width="200"><a style="text-decoration:none;" href="#" onclick="return jce.insertFormat(\'font\',\'' + fontNames[i] + '\');"><font face="' + fontNames[i] + '" size="5" unselectable="on">' + fontNames[i] + '</font></a><td>';
                        if (i % 2) {
                            fontsContent += '</tr><tr>';
                        }
                    }
                    fontsContent += '</tr></table>'
                    this.saveBox(type, txt['choose_font'], fontsContent);
                    break;
                case 'size':
                    var sizeNames = txt['sizes'];
                    var sizeValues = ['1', '2', '3', '4', '5'];
                    var sizeContent = '';
                    var i;
                    for (i = 0; i < sizeNames.length; i++) {
                        sizeContent += '<a href="#" onclick="return jce.insertFormat(\'size\',' + sizeValues[i] + ')"><font size="' + sizeValues[i] + '" unselectable="on">' + sizeNames[i] + '</font></a>';
                    }
                    this.saveBox(type, txt['choose_size'], sizeContent);
                    break;
                case 'color':
                    var c = ['00', '33', '66', '99', 'cc', 'ff'];
                    var count = 0;
                    var buttonColors = [];
                    var r, g, b;
                    for (r = 0; r < 6; r++) {
                        for (g = 0; g < 6; g++) {
                            for (b = 0; b < 6; b++) {
                                buttonColors[count] = c[r] + c[g] + c[b];
                                count++;
                            }
                        }
                    }
                    var colorContent = '';
                    var i = 0;
                    var clr;
                    for (clr in buttonColors) {
                        colorContent += '<a href="#" title="#' + buttonColors[clr] + '" alt="#' + buttonColors[clr] + '" "class="colorButton" onClick="return jce.insertFormat(\'color\',\'#' + buttonColors[clr] + '\');" style="background: #' + buttonColors[clr] + ';text-decoration:none;" unselectable="on">&nbsp;&nbsp;</a>';
                        i++;
                        if (!(i % 36)) {
                            colorContent += '<br/>';
                        }
                    }

                    this.saveBox(type, txt['choose_color'], colorContent);
                    break;
                case 'captcha':
                    this.saveBox(type, txt['verify'], txt['copy_code'] + ': <small>(<a href="/faq.php?keyword=verificatiecode" target="_blank">' + txt['why'] + '?</a>)</small><br/><table id="captcha" border="0" width="100%"><tr><td width="100" valign="top"><img id="captcha_img" src="/ckey.php?username=' + username + '&fkey=' + fkey + '&time=' + time + '" /></td><td><input type="text" name="ckey" value="" style="font-size:160%" maxlength="6" size="15" /><p><small>' + txt['unreadable'] + '? <a href="#" onclick="return refc();">' + txt['retry'] + '</a></small></p><div class="bottom"><button type="button" onclick="jce.submitMsg();">' + txt['send'] + '</button> &nbsp; <button type="button" onclick="jce.hideBox();">' + txt['cancel'] + '</button></div></td></tr></table>');
                    break;
            }
        }
        add(this.boxObj, '<div id="boxwrap"><h2><a href="#" onclick="return jce.hideBox();"><img border="0" src="img/close.gif" style="float:right;margin-top:2px;"/></a>' + this.box[type].title + '</h2><div class="c">' + this.box[type].content + '</div></div>');
        this.boxCSS.display = 'block';
        this.openBox = type;
    },
    submitMsg: function () {
        document.form.submit();
    },
    saveBox: function (type, title, content) {
        this.box[type] = {};
        this.box[type].title = title;
        this.box[type].content = content;
    },
    insertFormat: function (type, value) {
        this.hideBox();

        switch (type) {
            case 'bold':
                this.insertAtCaret('B');
                break;
            case 'italic':
                this.insertAtCaret('I');
                break;
            case 'color':
                this.insertAtCaret('COLOR', value);
                break;
            case 'font':
                this.insertAtCaret('FONT', value);
                break;
            case 'size':
                this.insertAtCaret('SIZE', value);
                break;
        }
        return false;
    },
    insertObject: function (type, value) {
        this.hideBox();
        switch (type) {
            case 'link':
                this.insertAtCaret('URL', value[0], null, value[1] || 'link');
                break;
            case 'image':
                this.insertAtCaret('IMG', null, null, value);
                break;
            case 'smiley':
                this.insertAtCaret(value[0], null, 1);
                break;
            case 'video':
                var sourceObj = value[1];
                for (i = 0; i < sourceObj.length; i++) {
                    if (sourceObj[i].checked) {
                        source = sourceObj[i].value;
                    }
                }
                if (!source) {
                    return false;
                }
                var pattern, url, i;
                for (i in this.videoPlatforms[source].patterns) {
                    pattern = this.videoPlatforms[source].patterns[i];
                    url = value[0].match(pattern);
                    if (url) {
                        this.insertAtCaret(source, null, null, url[1]);
                    }
                }
                return false;
                break;
        }
        return false;
    },
    insertAtCaret: function (tag, tagVal, single, text) {
        if (tagVal) {
            tagVal += '';
        }
        if (document.selection) {
            this.Focus();
            var caretPos = (this.inputObj.caretPos) ? this.inputObj.caretPos : d.selection.createRange().duplicate();
            var len = caretPos.text.length;
            caretPos.text = (single) ? tag : ((text) ? this.get_code(text, tag, tagVal) : this.get_code(caretPos.text, tag, tagVal));
            caretPos.moveStart('character', (single || text) ? 0 : -(len + 3 + tag.length));
            caretPos.moveEnd('character', (single || text) ? 0 : -(3 + tag.length));

            caretPos.select();
        }
        else if (this.inputObj.selectionStart || this.inputObj.selectionStart == '0') {
            var pos = {};
            pos.start = this.inputObj.selectionStart;
            pos.end = this.inputObj.selectionEnd;
            var msgVal = this.inputObj.value;

            this.inputObj.value = msgVal.substring(0, pos.start) + ((single) ? tag : ((text) ? this.get_code(text, tag, tagVal) : this.get_code(msgVal.substring(pos.start, pos.end), tag, tagVal))) + msgVal.substring(pos.end, msgVal.length);
            this.inputObj.selectionStart = pos.start + 2 + tag.length + ((tagVal) ? tagVal.length + 1 : 0) + ((single) ? -2 : 0) + ((text) ? text.length + tag.length + 3 : 0);
            this.inputObj.selectionEnd = pos.end + 2 + tag.length + ((tagVal) ? tagVal.length + 1 : 0) + ((single) ? -2 : 0) + ((text) ? text.length + tag.length + 3 : 0);
            this.Focus();
        }
    },
    get_code: function (text, tag, tagVal) {
        return '[' + tag + ((tagVal) ? '=' + tagVal : '') + ']' + text + '[/' + tag + ']';
    },
    saveC: function () {
        if (document.selection) {
            this.inputObj.caretPos = document.selection.createRange().duplicate();
        }
    },
    getLength: function () {
        return this.inputObj.value.length;
    },
    process: function () {
        d.form.ver_code_result.value = d.form.ver_code.value * 2;
        return false;
    },
    Focus: function () {
        this.inputObj.focus();
    }
};

/* general functions */
function add(obj, value, addToStart, addToEnd) {
    obj.innerHTML = (addToEnd) ? obj.innerHTML + value : ((addToStart) ? value + obj.innerHTML : value);
}
function refc() {
    var obj = $('captcha_img');
    var dv = Math.round(new Date().getTime() / 1000);
    obj.src = obj.src.substring(0, obj.src.length - 10) + dv;
    return false;
}
function checkLength(nosubmit) {
    var t = d.form.smsg;
    if (!nosubmit && t.value == txt['busy']) {
        return false;
    }
    var len = jce.getLength();
    if (len > 10000) {
        alert(txt['too_long'] + ' ' + (len - 10000) + ' ' + txt['chars']);
        return false;
    }
    else {
        if (!nosubmit) {
            t.value = txt['busy'];
        }
        return true;
    }
}
function $(e) {
    return document.getElementById(e)
}