// var UIBase = require("src/views/ui/UIBase.js")
// cc.loader.loadJs("src/views/ui/UIBase.js")
"use strict"
var CreateRoomUI = UIBase.extend({
    ctor: function () {
        this._super();
        this.resourceFilename = "res/ui/CreateRoomUI.json";
    },

    initUI: function () {
        this.game_num_idx = 8;   // 0:8局  1:16局
        this.is_normal_shoot_idx = 1;  //0:是  1：否

        this.createroom_panel = this.rootUINode.getChildByName("createroom_panel");
        this.initCreateRoomPanel();

        this.initCreateRoom();
        // create_btn
    },

    initCreateRoomPanel: function () {
        var self = this;
        var return_btn = ccui.helper.seekWidgetByName(this.createroom_panel, "return_btn");

        function return_btn_event(sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                self.hide()
            }
        }

        return_btn.addTouchEventListener(return_btn_event);

        //局数
        var game_num_chx1 = ccui.helper.seekWidgetByName(this.createroom_panel, "game_num_chx1");
        var game_num_chx2 = ccui.helper.seekWidgetByName(this.createroom_panel, "game_num_chx2");
        this.game_num_chx_list = [game_num_chx1, game_num_chx2];
        function game_num_event(sender, eventType) {
            if (eventType === ccui.CheckBox.EVENT_SELECTED || eventType === ccui.CheckBox.EVENT_UNSELECTED) {
                for (var i = 0; i < self.game_num_chx_list.length; i++) {
                    if (sender !== self.game_num_chx_list[i]) {
                        self.game_num_chx_list[i].setSelected(false);
                        self.game_num_chx_list[i].setTouchEnabled(true)
                    } else {
                        if (i === 0) {
                            self.game_num_idx = 8;
                        } else {
                            self.game_num_idx = 16;
                        }
                        sender.setSelected(true);
                        sender.setTouchEnabled(false);
                        cc.log("game_num_idx:", self.game_num_idx)
                    }
                }
            }
        }

        game_num_chx1.addTouchEventListener(game_num_event);
        game_num_chx2.addTouchEventListener(game_num_event);
        this.game_num_chx_list[0].setTouchEnabled(false);
        cc.log("game_num_idx:", this.game_num_idx);

        //是否普通放炮胡
        var normal_shoot_chx = ccui.helper.seekWidgetByName(this.createroom_panel, "normal_shoot_chx");

        function normal_shoot_chx_event(sender, eventType) {
            // cc.log("normal_shoot_chx_event");
            // cc.log(eventType);
            if (eventType === ccui.CheckBox.EVENT_SELECTED) {
                if (self.is_normal_shoot_idx === 0) {
                    self.is_normal_shoot_idx = 1;
                } else {
                    self.is_normal_shoot_idx = 0;
                }

                cc.log("is_normal_shoot_idx:", self.is_normal_shoot_idx);

            }
        }

        normal_shoot_chx.addTouchEventListener(normal_shoot_chx_event);
        cc.log("is_normal_shoot_idx:", self.is_normal_shoot_idx);
        this.createroom_panel.getChildByName("game_num_label1").setString("8局  （    X4或    X40）");
        this.createroom_panel.getChildByName("game_num_label2").setString("16局（    X8或    X80）");
    },

    initCreateRoom: function () {
        var self = this;
        var create_btn = ccui.helper.seekWidgetByName(this.createroom_panel, "create_btn");

        function create_btn_event(sender, eventType) {
            if (eventType === ccui.Widget.TOUCH_ENDED) {
                cutil.lock_ui();
                // var maxDealNum = 3
                // switch(self.game_num_idx){
                // 	case 0:
                // 		maxDealNum = 3;
                // 		break;
                // 	case 1:
                // 		maxDealNum = -1;
                // 		break;
                // 	default:
                // 		maxDealNum = 3;
                // 		break;

                // }
                // var startDealNum = 0
                // var diceAdd = 0
                // var isSameAdd = 0
                // switch(self.is_normal_shoot_idx){
                // 	case 0:
                // 		startDealNum = 2;
                // 		break;
                // 	case 1:
                // 		startDealNum = 3;
                // 		break;
                // 	case 2:
                // 		startDealNum = 2;
                // 		diceAdd = 8;
                // 		isSameAdd = 1;
                // 		break;
                // 	case 3:
                // 		startDealNum = 2;
                // 		diceAdd = 10;
                // 		isSameAdd = 1;
                // 		break;
                // 	default:
                // 		startDealNum = 2;
                // 		diceAdd = 0;
                // 		isSameAdd = 0;
                // 		break;
                // }
                // var maxLoseScore = self.max_lose_score

                //TODO 创建房间
                cc.log("房间局数：" + self.game_num_idx + "   是否放炮胡：" + self.is_normal_shoot_idx);
                h1global.entityManager.player().createRoom(self.game_num_idx, self.is_normal_shoot_idx, 0);
                self.hide()
            }
        }

        create_btn.addTouchEventListener(create_btn_event);
    }
});