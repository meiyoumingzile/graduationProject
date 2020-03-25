var AudioPlayer;
(function (AudioPlayer) {
    var _mute = false;
    function setMute(v) {
        if (_mute != v) {
            _mute = v;
            egret.localStorage.setItem("mute", v ? "1" : "0"); //保存数据
        }
    }
    AudioPlayer.setMute = setMute;
    function isMute() {
        return _mute;
    }
    AudioPlayer.isMute = isMute;
    function init() {
        _mute = egret.localStorage.getItem("mute") == "1"; //读取数据
    }
    AudioPlayer.init = init;
    var _bgmChannel; //控制程序中的声音
    var _bgm; //使用声音
    function playMusic() {
        _pausePosition = 0;
        if (_mute)
            return;
        var promise = RES.getResAsync("bgm.mp3"); //异步方式获取配置里的资源
        promise && promise.then(function (res) {
            _bgm = res;
            _bgmChannel && _bgmChannel.stop(); //停止在该声道中播放声音。
            _bgmChannel = res.play(0); //生成一个新的 SoundChannel 对象来播放该声音(startTime,loops)
            _bgmChannel.once(egret.Event.SOUND_COMPLETE, _onMusicOver, null); //在声音完成播放后调度
        });
    }
    AudioPlayer.playMusic = playMusic;
    function _onMusicOver() {
        _bgmChannel && (_bgmChannel = undefined);
    }
    var _pausePosition = 0;
    function pauseMusic() {
        if (_bgmChannel) {
            _pausePosition = _bgmChannel.position;
            _bgmChannel.stop();
            _bgmChannel = undefined;
        }
    }
    AudioPlayer.pauseMusic = pauseMusic;
    function resumeMusic() {
        if (_bgm && !_bgmChannel && _pausePosition) {
            _bgmChannel = _bgm.play(_pausePosition, 1);
            _bgmChannel.once(egret.Event.SOUND_COMPLETE, _onMusicOver, null);
        }
    }
    AudioPlayer.resumeMusic = resumeMusic;
    function stopMusic() {
        _pausePosition = 0;
        if (_bgmChannel) {
            var channel_1 = _bgmChannel;
            _bgmChannel = undefined;
            channel_1.once(egret.Event.SOUND_COMPLETE, function () {
                egret.Tween.removeTweens(channel_1); //删除一个对象上的全部 Tween 动画
            }, null);
            egret.Tween.get(channel_1).to({ volume: 0 }, 1000).call(function () {
                channel_1.stop();
            });
        }
    }
    AudioPlayer.stopMusic = stopMusic;
    function playSound(name) {
        if (_mute)
            return;
        var sd = RES.getRes(name); //同步方式获取缓存的已经加载成功的资源
        sd && sd.play(0, 1);
    }
    AudioPlayer.playSound = playSound;
})(AudioPlayer || (AudioPlayer = {}));
//# sourceMappingURL=AudioPlayer.js.map