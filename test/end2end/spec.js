describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://projetolistacontato.herokuapp.com/');

    expect(browser.getTitle()).toEqual('Lista de Contatos App');
  });
});