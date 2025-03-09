export class Utils {
    static format(str: string, data: any): string{   
        data = data || {};
        Object.keys(data).forEach(function(key) {
         str = str.replace(new RegExp('{{' + key + '}}', 'g'), data[key]);
        });
        return str;
    }
}