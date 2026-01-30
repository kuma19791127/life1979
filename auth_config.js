// ==========================================
// 認証・テナント管理用 モックデータベース
// ==========================================
// 1. 契約データベース (電話番号 -> 企業ID)
// 実際はサーバーサイドで管理する情報
const CONTRACT_DB = {
    // ライフコーポレーション支給端末
    "090-1111-1111": { chainId: "life", deviceLabel: "ライフ本部支給 001", role: "admin" },
    "090-1111-2222": { chainId: "life", deviceLabel: "ライフ店舗用 002", role: "staff" },
    // イトーヨーカドー支給端末
    "080-3333-1111": { chainId: "itoyokado", deviceLabel: "IY本部支給 A", role: "admin" },
    "080-3333-2222": { chainId: "itoyokado", deviceLabel: "IY店舗用 B", role: "staff" },
    // ドン・キホーテ支給端末
    "070-5555-1111": { chainId: "donki", deviceLabel: "ドンキ本部支給 X", role: "admin" },
    "070-5555-2222": { chainId: "donki", deviceLabel: "ドンキ店舗用 Y", role: "staff" }
};
// 2. チェーン設定 (企業情報)
const CHAINS = {
    "life": {
        name: "ライフコーポレーション",
        themeColor: "#008D40", // ライフグリーン
        logoText: "LIFE"
    },
    "itoyokado": {
        name: "イトーヨーカドー",
        themeColor: "#DD0000", // IYレッド
        logoText: "Ito Yokado"
    },
    "donki": {
        name: "ドン・キホーテ",
        themeColor: "#000000", // ドンキブラック
        logoText: "Don Quijote"
    }
};
// 3. 店舗リスト (企業ID -> 店舗一覧)
const STORES = {
    "life": [
        { id: "life_001", name: "渋谷東店" },
        { id: "life_002", name: "セントラルスクエア恵比寿店" },
        { id: "life_003", name: "大阪駅前店" }
    ],
    "itoyokado": [
        { id: "iyo_001", name: "アリオ北砂店" },
        { id: "iyo_002", name: "グランツリー武蔵小杉店" },
        { id: "iyo_003", name: "横浜別所店" }
    ],
    "donki": [
        { id: "donki_001", name: "MEGAドン・キホーテ渋谷本店" },
        { id: "donki_002", name: "六本木店" },
        { id: "donki_003", name: "浅草店" }
    ]
};
// --- Helper Functions ---
/**
 * 電話番号でログイン判定を行う
 * @param {string} phoneNumber 
 * @returns {object|null} 認証成功ならセッション情報、失敗ならnull
 */
function authenticate(phoneNumber) {
    // ハイフンありなし両方に対応するための正規化
    const normalizedNum = phoneNumber.replace(/-/g, "");
    // DB検索 (実運用ではAPIコール)
    // 簡易的にハイフン付きのキーを探す（デモ用実装）
    // 本来は正規化して比較する
    const user = Object.keys(CONTRACT_DB).find(key => key.replace(/-/g, "") === normalizedNum);
    if (user) {
        const contract = CONTRACT_DB[user];
        const chain = CHAINS[contract.chainId];
        return {
            phoneNumber: user,
            chainId: contract.chainId,
            chainName: chain.name,
            themeColor: chain.themeColor,
            deviceLabel: contract.deviceLabel,
            availableStores: STORES[contract.chainId] || []
        };
    }
    return null;
}
// 4. 取引ログ・売上管理 (Mock Database)
const TRANSACTION_LOGS = [];
/**
 * 取引を記録する
 */
function logTransaction(storeId, chainId, amount, orderId) {
    const log = {
        timestamp: new Date().toISOString(),
        orderId: orderId,
        storeId: storeId,
        chainId: chainId,
        amount: amount,
        fee: Math.floor(amount * 0.01) // 1.0%の手数料計算
    };
    TRANSACTION_LOGS.push(log);
    console.log("Transaction Logged:", log);
    return log;
}
/**
 * 管理者用：売上集計を取得
 */
function getAdminStats() {
    let totalSales = 0;
    let totalFees = 0;
    const count = TRANSACTION_LOGS.length;
    TRANSACTION_LOGS.forEach(log => {
        totalSales += log.amount;
        totalFees += log.fee;
    });
    return {
        count: count,
        totalSales: totalSales,
        totalFees: totalFees // これが我々の収益
    };
}

        };
    }
    return null;
}

