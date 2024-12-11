// Bibliotecas
import { useState, useEffect } from "react";
import Axios from "axios";
import "./style.css";
import { Profile } from "./Profile/profile";

export function Home() {
  const [accountName, setAccountName] = useState(); // Estado para os nome do usuário
  const [userRes, setUserRes] = useState(); // Estado para a resposta da API (Dados do usuário)
  const [repos, setRepos] = useState([]); // Estado para os repositórios

  // Função assíncrona que realiza a busca do perfil do usuário no GitHub
  const buscarConta = async () => {
    // Faz uma requisição GET para a API do GitHub com o nome da conta informado pelo usuário
    if (!accountName) {
      alert("Por favor, insira um nome de usuário.");
      return;
    }
    try {
      const userReq = await Axios.get(
        `https://api.github.com/users/${encodeURIComponent(accountName)}`
      );

      // Requisição para os repositórios
      const reposReq = await Axios.get(userReq.data.repos_url);
      
      if (!reposReq.data || reposReq.data.length === 0) {
        setError("Este usuário não possui repositórios públicos.");
        setRepos([]); // Garante que os repositórios sejam resetados
        return;
      }

      // Salva a resposta do usuário no estado `userRes`
      setUserRes(userReq.data);

      // Salva os repositorios no 'repos'
      setRepos(reposReq.data);

      setAccountName("");
    } catch (err) {
      alert("Erro ao buscar os dados. Verifique o nome de usuário!");
      console.error("Erro ao buscar dados do github", err);
    }
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
            placeholder="Digite o nome do usuário"
            value={accountName}
            onChange={(event) => {
              setAccountName(event.target.value);
            }}
          />
          <button className="searchBtn" onClick={buscarConta}>
            Procurar
          </button>

          <Profile userRes={userRes} repos={repos} />
        </div>
      </section>
    </>
  );
}
