// Bibliotecas
import { useState, useEffect } from "react";
import Axios from "axios";
import "./style.css";
import { Profile } from "../Home/Profile/profile";

export function Home() {
  const [accountName, setAccountName] = useState();
  const [userRes, setuserRes] = useState();
  const [repos, setRepos] = useState([]); // Estado para os repositórios

  // Função assíncrona que realiza a busca do perfil do usuário no GitHub
  const verificarConta = async () => {
     // Faz uma requisição GET para a API do GitHub com o nome da conta informado pelo usuário
    const userReq = await Axios.get(
      `https://api.github.com/users/${encodeURIComponent(accountName)}`
    );
     // Limpa o campo de entrada após a pesquisa, definindo `accountName` como uma string vazia
    setAccountName('');
   
     // Salva a resposta do usuário no estado `userRes`
    setuserRes(userReq.data);
    console.log(userRes);

    // Requisição para os repositórios
    const reposReq = await Axios.get(userRes.repos_url);
      // Extrai os dados dos repositórios e armazena no estado `repos`
    const reposData = reposReq.data;

    setRepos(reposData); // Salva repositórios no estado
   
  };

  return (
    <>
      <header>
        <h1 className="logoName">Github Seach</h1>
      </header>

      <section className="containerSearch">
        <div>
          <input
            type="text"
            name="account"
            id="accountName"
            placeholder="Digite o nome do usuário..."
            value={accountName}
            onChange={(event) => {
              setAccountName(event.target.value);
            }}
          />
          <button className="searchBtn" onClick={verificarConta}>Procurar</button>
          <Profile userRes={userRes} repos={repos} />

        </div>
      </section>
    </>
  );
}
