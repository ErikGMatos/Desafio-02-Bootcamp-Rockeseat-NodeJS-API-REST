module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      // qual tabela eu quero adicionar uma coluna e qual o nome dessa coluna
      type: Sequelize.INTEGER,
      // configurações da coluna que sera adicionada "avatar_id"
      references: { model: 'files', key: 'id' },
      // model: Qual tabela que "avatar_id" irá referenciar
      // key: campo "id" da tabela "files"
      // todo "avatar_id" sera chave estrangeira da tabela "files" no "id"
      onUpdate: 'CASCADE', // se o arquivo da tabela "files" for atualizado sera refletido na tabela "users" no campo "avatar_id" tbm
      onDelete: 'SET NULL', // se o arquivo da tabela "files" for deletado será setado NULL no campo "avatar_id" da tabela "users"
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
    // Se der um "rollback" ele remove a coluna "avatar_id" da tabela "users"
  },
};
