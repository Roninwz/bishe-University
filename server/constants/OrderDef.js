'use strict';

/**
 * 订单相关常量
 */
const OrderDef =
    {
        /**
         * 订单状态: 0.新建/1.正常/2.取消
         */
        Status: {
            New: 0,
            Normal: 1,
            Cancel: 2
        },
        /**
         * 订单类型: 1.捐赠/2.申领
         */
        Type: {
            Donate: 1,
            Receive: 2
        },
        /**
         * 捐赠方式：1.邮寄/2.自送
         */
        DonateType: {
            Mail: 1,
            Self: 2
        },
        /**
         * 领用方式:1.邮寄/2.自领
         */
        ReceiveType: {
            Mail: 1,
            Self: 2
        },
        /**
         * 排行榜类型:1.年度/2.累计
         */
        RankingListType: {
            Annually: 1,
            All: 2
        }
    };

module.exports = OrderDef;
