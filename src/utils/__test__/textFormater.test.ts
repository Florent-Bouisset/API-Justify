import TextFormater from '../textFormater'

test('Short text should not change', async () => {
    const text = "Bonjour et bienvenue à toutes et a tous"
    const justifiedText = TextFormater.justify(text)
    expect(justifiedText).toEqual(text)
});

test('Longer text should be split in two lines', async () => {
    const text = "Bonjour et bienvenue à toutes et a tous pour suivre cette affiche entre Lille et le Celtic Glasgow"
    const expectedText = "Bonjour et bienvenue à toutes et a tous pour suivre cette affiche entre Lille et\nle Celtic Glasgow"
    const justifiedText = TextFormater.justify(text)
    expect(justifiedText).toEqual(expectedText)
});

test('Space should be added if line 1 is not 80 char long', async () => {
    const text = "Gros retour d'André qui tacle proprement Ntcham qui semblait avoir pris le meilleur aux vingt-cinq mètres dans l'axe."
    const expectedText = "Gros  retour  d'André  qui  tacle  proprement  Ntcham qui semblait avoir pris le\nmeilleur aux vingt-cinq mètres dans l'axe."
    const justifiedText = TextFormater.justify(text)
    expect(justifiedText).toEqual(expectedText)
});






