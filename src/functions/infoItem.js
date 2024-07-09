const axios = require('axios');

const infoItem = async (itemGroup, itemIndex) => {
    try {
        const response = await axios.get('http://localhost:5000/ItemList');

        const data = response.data.Section;

        const itemsGroup = data.find(group => group.Index == itemGroup);
        
        if (itemsGroup) {
            const item = itemsGroup.Item.find(item => item.Index == itemIndex);
            if (!item) return;
            else return item;
        } else {
            return;
        };
    } catch (error) {
        console.error('Error making request:', error.message);
    };
};

module.exports = { infoItem };