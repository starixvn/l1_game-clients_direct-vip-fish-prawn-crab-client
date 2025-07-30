const win = window as any;
export const languages = {
    "Common": {},
    "VipFishPrawnCrab": {}
};

if (!win.languages) {
    win.languages = {};
}

win.languages.zh_cn = languages;