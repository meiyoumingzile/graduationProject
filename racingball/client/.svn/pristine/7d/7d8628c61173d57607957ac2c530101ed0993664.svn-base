
interface RobotInfo {
    id: string,
    name: string,
    photo: string,
    // id: string,
    // ipLocal: string | undefined
}

namespace LocalRobotData {

    export function getRobotsInfo(): Promise<RobotInfo[]> {
        return app.platform.getConnectedFriendList().then(list => {
            while (list.length > 8) {
                list.splice(Utils.randomInt(0, list.length), 1);
            }
            let robotIDs: number[] = [];
            while (true) {
                let r = Utils.randomInt(1, 324);
                if (!robotIDs.includes(r)) robotIDs.push(r);
                if (robotIDs.length + list.length >= 11) break;
            }
            let ret1 = robotIDs.map(id => getRobotInfoFromCfg(id));
            let ret2 = list.map(p => {
                return {
                    id: p.getID(),
                    name: p.getName(),
                    photo: p.getPhoto(),
                }
            });
            ret1 = ret1.concat(ret2)
            Utils.makeArrayRandom(ret1);
            return ret1;
        });
    }

    function getRobotInfoFromCfg(id: number) {
        const cfg = DB_avatar.get(id);
        return {
            id: cfg.id + "",
            name: cfg.name,
            photo: 'resource/assets/avatar/' + cfg.pic
        }
    }
}