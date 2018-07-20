const Converter = require('./app.js');

describe('Hex Conwerter', () => {
    let converter;

    beforeEach(() => {
        converter = new Converter;
    });

    test('Should be defined', () => {
        expect(Converter).toBeDefined();
    });

    test('Sould throw error when called without parameter', () => {
        expect(converter.toHex).toThrowError('Parameter needed');
    });

    const wrongLengthTables = [[],[1], [1,2], [1,2,3,4], [1,2,3,4,5]];
    wrongLengthTables.forEach (function(el){
        test(`Should throw error when called with array with length not equal 3. Test case: [${el}]`, () => {
            expect(function(){
                converter.toHex(el);
            }
            ).toThrowError('Parameter needed');
        });
    });

    const wrongTypeTables = [['a','b','c'], [{r:4}, {g:100}, {b:200}], [3,,3], [100.1, 0, 244]];
    wrongTypeTables.forEach (function(el){
        test(`Should throw error when called with array not containing integer numbers. Test case: [${el}]`, () => {
            expect(function(){
                converter.toHex(el);
            }
            ).toThrowError('Parameter should contain integer numeric data');
        });
    });

    test('Should rerurn string', () => {
        expect(converter.toHex([1,2,3])).toEqual(expect.any(String));
    });

    const pattern = /^#\w{3,6}$/
    test('Should return string begining with # and 3-6 chars', () => {
        expect(converter.toHex([100,300,300])).toMatch(pattern);
    });

    const colors = [
        {rgb: [100,100,100], value: "#646464", case: 'two digits result for each color component'},
        {rgb: [50,50,50], value: "#323232", case: 'two digits result for each color component'},
        {rgb: [255,50,100], value: "#ff3264", case: 'two digits result for each color component'},
        {rgb: [255,50,0], value: "#ff3200", case: 'single digit result for one color component'},
        {rgb: [255,11,0], value: "#ff0b00", case: 'single digit result for two color component'},
        {rgb: [0,0,0], value: "#000", case: 'shortened notation result'},
        {rgb: [255,255,255], value: "#fff", case: 'shortened notation result'},
        {rgb: [255,51,0], value: "#f30", case: 'shortened notation result'},
        {rgb: [300,50,-50], value: "#ff3200", case: 'color compotents out of scale'},
        {rgb: [300,51,-1], value: "#f30", case: 'color components out of scale and shortened notation'}
      ];
    colors.forEach (function(el){
        it(`Should return ${el.value}, for parameter [${el.rgb}] testing case - ${el.case}`, () => {
            expect(converter.toHex(el.rgb)).toEqual(el.value);
        })
    });
})