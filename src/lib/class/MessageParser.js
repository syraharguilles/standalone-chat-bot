export function MessageParser(actionProvider) {
    this.actionProvider = actionProvider;

    this.parseSubCategoryList = async function(parseObj) {
        
        const obj = await parseObj;

        if(!obj) {
            return;
        }

        await this.actionProvider.setGetter(parseObj);
    }

    this.parseSupCategoryList = async function(parseObj) {
        
        const obj = await parseObj;

        if(!obj) {
            return;
        }

        await this.actionProvider.setGetter(parseObj);
    }

    this.parseLocation = async function(parseObj) {
        
        const obj = await parseObj;

        if(!obj) {
            return;
        }

        await this.actionProvider.setGetter(parseObj);
    }

    this.parseGeoLocation = async function(parseObj) {
        
        const obj = await parseObj;

        if(!obj) {
            return;
        }

        await this.actionProvider.setGetter(parseObj);
    }

    this.parseConsumerLocation = async function(parseObj) {
        
        const obj = await parseObj;

        if(!obj) {
            return;
        }

        await this.actionProvider.setGetter(parseObj);
    }

    this.parseMessage = async function(parseObj) {
        const obj = await parseObj;

        if(!obj) {
            return;
        }

        await this.actionProvider.setGetter(parseObj);
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        MessageParser
    };
}