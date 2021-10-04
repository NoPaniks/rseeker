export async function fetchJsonData() {
    try {
      const response = await fetch('../data/data.json');
      if (response.ok) {
        return await response.json();
      }
      console.error('Retour du serveur : ', response.status);
    } catch (e) {
      console.error(e);
    }
  }

  