const getUuid = async () => {
  const respuesta = await fetch('http://127.0.0.1/api/get-uuid');
  const data = await respuesta.json()
  document.getElementById('result').innerHTML = data.uuid
}

document.getElementById('button').addEventListener('click', getUuid)
