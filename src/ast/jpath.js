Yate.AST.jpath = {

    options: {
        base: 'inline_expr'
    },

    _type: Yate.Types.NODESET,

    isLocal: function() {
        return true;
    },

    action: function() {
        var key = this.yate(); // Каноническая запись jpath.

        var state = this.state;

        // В state хранятся все уникальные jpath'ы.
        // Если где-то используется два (или больше) одинаковых jpath'а, то первый из них будет запомнен,
        // а все последующие будут ссылаться на него по его id-шнику.

        // Если этот jpath еще не хранится в state, то добаляем его туда.
        var jid = state.jkeys[key];
        if (jid === undefined) {
            jid = state.jkeys[key] = state.jid++;
            state.jpaths.push(this);
        }

        this.Jid = jid; // Запоминаем id-шник.
        this.Key = key;
    },

    validate: function() {
        var context = this.Context;
        if (context && !context.type( Yate.Types.NODESET )) {
            context.error('Invalid type. Should be NODESET');
        }
    },

    // oncast: function() {},

    // Возвращаем значение последнего nametest'а или же ''.
    // Например, lastName(/foo/bar[id]) == 'bar', lastName(/) == ''.
    lastName: function() { // FIXME: Унести это в jpath_steps?
        var steps = this.Steps;
        if (!steps) { return ''; }
        var l = steps.Items.length;
        return (l) ? steps.Items[l - 1].Name : '';
    }

};
