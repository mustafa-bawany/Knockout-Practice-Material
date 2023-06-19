$(function () {
    $('#modal').hide();
    var foo = new empresa(1, "Fortes");

    function empresa(codigo, nome) {
        var self = this;

        self.Codigo = ko.observable(codigo);
        self.Nome = ko.observable(nome);
        self.Estabelecimentos = ko.toProtectedObservableItemArray([new establishments(1, "Headquarters")]);
        self.estabelecimentoSelecionado = ko.observable(null);

        self.selecionarEstabelecimento = function () {
            foo.estabelecimentoSelecionado(this);
        };
        self.novoEstabelecimento = function () {
            self.estabelecimentoSelecionado(new ko.protectedObservableItem(new estabelecimento("", "")));
            $('#modal').dialog({
                title: "Alterando estabelecimento",
                width: 450,
                buttons: {
                    "Salvar": function () {
                        self.estabelecimentoSelecionado().commit();
                        self.Estabelecimentos.push(self.estabelecimentoSelecionado());
                        self.estabelecimentoSelecionado(null);
                        $('#modal').dialog('close');
                    },
                    "Cancelar": function () {
                        $('#modal').dialog('close');
                    }
                }
            });
        };
    }

    function establishments(codigo, nome) {
        this.Codigo = codigo;
        this.Nome = nome;
    }

    $(document).on('click', 'tbody a', function () {
        $('#modal').dialog({
            title: "Alterando estabelecimento: " + foo.estabelecimentoSelecionado().Nome(),
            width: 450,
            buttons: {
                "Salvar": function () {
                    foo.estabelecimentoSelecionado().commit();
                    $('#modal').dialog('close');
                },
                "Cancelar": function () {
                    $('#modal').dialog('close');
                }
            }
        });
    });

    ko.applyBindings(foo);
});