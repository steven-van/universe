export const formatBirthday = (birthday) => {
    return new Date(birthday).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };