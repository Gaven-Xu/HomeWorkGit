window.ucai = window.ucai || {};
(function() {

    var HomeWork = function(container) {
        this._container = container;
        this._table = document.createElement('div'); // table
        this._table.setAttribute('cellspacing', '0');
        this._table.setAttribute('cellpadding', '0');
        this._lineIndex = 0;
        this._infoLists = {};
        this._nameReg = /[^0-9]/;
        this._gitReg = /(http\:\/\/|https\:\/\/|git@)\b.+\b\.git/;
        this._indexReg = /line([0-9]+)/;
    };

    HomeWork.prototype.checkName = function(str) {
        if (str !== '' && str !== null && this._nameReg.test(str)) {
            return true;
        } else {
            return '姓名不能为空,且不能以纯数字作为姓名;\n';
        }
    };

    HomeWork.prototype.checkGitlink = function(str) {
        if (this._gitReg.test(str)) {
            return true;
        } else {
            return '请输入正确的git地址;\n';
        }
    };

    HomeWork.prototype.deleteTr = function(element) {
        element.parentNode.removeChild(element);
        this._lineIndex--;
    };

    HomeWork.prototype.createTr = function(isTh) {
        // 功能，append tr 并且 记录数据
        //a = true or false
        // 增加th和td的方法
        var tr = document.createElement('div'); //tr
        var info = [];

        if (isTh === true) {
            tr.className = 'line line';
            for (var i = 1; i < arguments.length; i++) {

                var th = document.createElement('div'); //th
                th.className = 'th' + i;
                th.innerHTML = arguments[i];

                tr.appendChild(th);
            }

        } else if (isTh === false) {
            tr.className = 'line line' + this._lineIndex;
            this._lineIndex++;

            for (var n = 1; n < arguments.length; n++) {
                var td = document.createElement('div');
                td.className = 'td' + n;

                td.innerHTML = arguments[n];
                info.push(arguments[n]); // 本次数据，插入 info 数组
                tr.appendChild(td);
            }

            var td_btn = document.createElement('div');
            td_btn.className = 'td3';
            td_btn.innerHTML = '-';
            var self = this;
            td_btn.onclick = function() {
                self.deleteTr(this.parentNode);
                self.deleteInfo(this.parentNode.className);
            };
            tr.appendChild(td_btn);
            this.insertInfo(tr.className, info); // 将info push进入 _info-Lists
        } else {
            alert('isTh值未设置');
        }
        this._table.appendChild(tr);
        this._container.appendChild(this._table);
        // 打算用面向对象的方式改写，table具有get 和 set方法，tr也是，td也是
        // tr 还要有 prototype.delete方法，用来移除本行
    };

    HomeWork.prototype.insertInfo = function(key, value) {
        this._infoLists[key] = value; // 往infoLists中插入数据
    };

    HomeWork.prototype.deleteInfo = function(key) {
        delete this._infoLists[key]; // 从infoLists中移除数据
    };

    HomeWork.prototype.getInfoList = function() {
        return this._infoLists;
    };

    ucai.HomeWork = HomeWork;

})();
