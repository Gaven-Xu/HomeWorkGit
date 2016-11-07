window.ucai = window.ucai || {};
(function() {

    var Cont = document.getElementById('Container');
    var itemAddBtn = document.getElementById('AddBtn');
    var ConfigBtn = document.getElementById('ConfigBtn');
    var UpdataBtn = document.getElementById('UpdataBtn');
    var hw = new ucai.HomeWork(Cont);
    var file = new ucai.File();
    var index = 1;
    var configfileName = 'homework_config.sh';
    var pullfileName = 'homework_pull.sh';

    hw.createTr(true, '姓名', 'Git地址', '〇');
    // console.log(file.getText(fileName));
    itemAddBtn.addEventListener('click', function() {
        var name = document.getElementById('Name').value;
        var gitlink = document.getElementById('Gitlink').value;
        if (hw.checkName(name) === true && hw.checkGitlink(gitlink) === true) {
            hw.createTr(false, name, gitlink);
            document.getElementById('Name').value = '';
            document.getElementById('Gitlink').value = '';
        } else {
            alert(hw.checkName(name) + hw.checkGitlink(gitlink));
        }
    });

    ConfigBtn.addEventListener('click', function() {
        var data = hw.getInfoList()
        var statu = file.configGitFolder(configfileName, data);
        file.pullFile(pullfileName, data)
        if (statu && statu === true) {
            alert('配置Git目录成功，可以进行更新操作');
        } else {
            alert('配置失败');
        }
    });

    // UpdataBtn.addEventListener('click',function() {
    // 	file.runSh(fileName);
    // });

})();
