const generateHexItem = (level, durability, skill, luck, life, exeOP, setOP, HHOP, op380, socket1, socket2, socket3, socket4, socket5, itemGroup, itemIndex, serialItem) => {
    let LevelLifeSkillLuck = 0;

    if (luck == 1) LevelLifeSkillLuck += 4;
    if (skill == 1) LevelLifeSkillLuck += 128;
    if (4 <= life) LevelLifeSkillLuck += life - 4;
    else LevelLifeSkillLuck += life;
    if (0 < level) LevelLifeSkillLuck += level * 8;

    if (256 <= itemIndex) itemIndex = itemIndex - 256;

    let itemHex = ("0" + itemIndex.toString(16)).slice(-2);
    itemHex += ("0" + LevelLifeSkillLuck.toString(16)).slice(-2);
    itemHex += ("0" + durability.toString(16)).slice(-2);
    itemHex += ("00000000" + serialItem.toString(16)).slice(-8);
    itemHex += ("0" + exeOP.toString(16)).slice(-2);
    itemHex += ("0" + setOP.toString(16)).slice(-2);
    itemHex += itemGroup.toString(16);
    itemHex += op380 == 128 ? "8" : "0";
    itemHex += ("0" + HHOP.toString(16)).slice(-2);
    itemHex += ("0" + socket1.toString(16)).slice(-2);
    itemHex += ("0" + socket2.toString(16)).slice(-2);
    itemHex += ("0" + socket3.toString(16)).slice(-2);
    itemHex += ("0" + socket4.toString(16)).slice(-2);
    itemHex += ("0" + socket5.toString(16)).slice(-2);
    itemHex = itemHex.toUpperCase();
    
    return itemHex;
};

module.exports = { generateHexItem };