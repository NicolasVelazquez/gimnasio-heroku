import moment from 'moment'

export default class CommonUtils {
    
    static getDateFromSubscriptionType(subscriptionType){
        let now = moment().hours(23).minutes(59);
        switch (subscriptionType) {
            case "Diario":
                now.add(1, 'days')
                break
            case "Semanal":
                now.add(1, 'weeks')
                break
            case "Quincenal":
                now.add(2, 'weeks')
                break
            case "Mensual":
                now.add(1, 'months')
                break
            case "Semestral":
                now.add(6, 'months')
                break
            case "Anual":
                now.add(1, 'year')
                break
            default:
                break
        }
        return now.format()
    }
}