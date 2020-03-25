var LocalRobotData;
(function (LocalRobotData) {
    function getRobotsInfo() {
        return app.platform.getConnectedFriendList().then(function (list) {
            while (list.length > 8) {
                list.splice(Utils.randomInt(0, list.length), 1);
            }
            var robotIDs = [];
            while (true) {
                var r = Utils.randomInt(1, 324);
                if (!robotIDs.includes(r))
                    robotIDs.push(r);
                if (robotIDs.length + list.length >= 11)
                    break;
            }
            var ret1 = robotIDs.map(function (id) { return getRobotInfoFromCfg(id); });
            var ret2 = list.map(function (p) {
                return {
                    id: p.getID(),
                    name: p.getName(),
                    photo: p.getPhoto(),
                };
            });
            ret1 = ret1.concat(ret2);
            Utils.makeArrayRandom(ret1);
            return ret1;
        });
    }
    LocalRobotData.getRobotsInfo = getRobotsInfo;
    function getRobotInfoFromCfg(id) {
        var cfg = DB_avatar.get(id);
        return {
            id: cfg.id + "",
            name: cfg.name,
            photo: 'resource/assets/avatar/' + cfg.pic
        };
    }
})(LocalRobotData || (LocalRobotData = {}));
//# sourceMappingURL=LocalRobotData.js.map