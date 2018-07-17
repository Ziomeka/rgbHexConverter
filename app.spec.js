const Converter = require('./app.js');

describe('Hex Konwerter', () => {
    let converter;
    let pattern = /^#\w{3,6}$/
    beforeEach(() => {
        converter = new Converter;
    });

    test('Converter exists', () => {
        expect(Converter).toBeDefined();
    });

    test('Czy wywolany bez parametow rzuca blad', () => {
        expect(converter.toHex).toThrowError('Parameter needed');
    });

    let badTables = [[],[1], [1,2], [1,2,3,4], [1,2,3,4,5]];
    badTables.forEach (function(el){
        test(`Czy zwraca blad jesli tablica nie ma 3 elementow ${el}`, () => {
            expect(function(){
                converter.toHex([]);
            }
            ).toThrowError('Parameter needed');
        });
    });

    test('Czy zwraca string', () => {
        expect(converter.toHex([1,2,3])).toEqual(expect.any(String));
    });

    test('Czy zwraca odpowiedni pattern', () => {
        expect(converter.toHex([1,2,3])).toMatch(pattern);
    });

    const colors = [
        {rgb: [0,0,0], value: "#000000"},
        {rgb: [255,255,255], value: "#ffffff"},
        {rgb: [100,100,100], value: "#646464"},
        {rgb: [50,50,50], value: "#323232"},
        {rgb: [255,50,100], value: "#ff3264"},
        {rgb: [255,50,0], value: "#ff3200"},
      ];
    colors.forEach (function(el){
        it(`should return ${el.value}, for paremeter ${el.rgb}`, () => {
            expect(converter.toHex(el.rgb)).toEqual(el.value);
        })
    });

})