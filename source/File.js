window.ucai = window.ucai || {};
const fs = require("fs");
const cp = require("child_process");
(function() {

    var File = function() {
        this._info = '';
    }

    File.prototype.configGitFolder = function(name, hwinfo) {
        this._info = '';
        for (var i in hwinfo) {
            if (hwinfo.hasOwnProperty(i)) {
                var data = hwinfo[i];
                this._info +=
                    'mkdir ' + data[0] + '\n' +
                    'cd ' + data[0] + '\n' +
                    'git init' + '\n' +
                    'git remote add o ' + data[1] + '\n' +
                    'cd ../\n\n';
            }
        }
        let statu = this.insertText(name, this._info);
        if (statu || statu === true) {
            return true;
        } else {
            return '配置git地址或者创建git目录出错';
        }
    }

	File.prototype.pullFile = function (name,hwinfo) {
		this._info = '';
		for (var i in hwinfo) {
            if (hwinfo.hasOwnProperty(i)) {
                var data = hwinfo[i];
                this._info +=
					'# ' + data[0] + '\n' +
                    'cd ' + data[0] + '\n' +
                    'printf ' + data[0] + ':\n' +
                    'git pull o master \n'+
                    'cd ../\n\n';
					// cd zhuli
					// printf 朱莉:
					// git pull o master
					// cd ../
            }
        }
        this.insertText(name, this._info);
	}

    File.prototype.insertText = function(name, data) {
        fs.writeFile(name, data, function(err) {
            if (err) {
                return console.error(err);
            }
        });
        return true;
        // console.log('insert' + name + 'success');
    }

	File.prototype.getText = function (filename) {
		var returnData = null;
		fs.readFile(filename,'utf8',(err,filedata)=>{
			if(err){
				throw err;
			}
			return filedata;
			// console.log(returnData);
		});
	}

    File.prototype.runSh = function(path) {
        // cp.execFile(name); // spwan错误,需要继续修改
        cp.exec('sh '+path,()=>{});
    }

    ucai.File = File;
})();
