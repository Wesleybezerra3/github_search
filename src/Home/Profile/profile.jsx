import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export function Profile({ userRes, repos }) {
  // Estado para controlar a visibilidade do perfil do usuário
  const [isVisible, setIsVisible] = useState(false);

  // useEffect é executado sempre que o valor de userRes muda
  useEffect(() => {
    // Se os dados do usuário estiverem disponíveis, torna o perfil visível
    if (userRes) {
      setIsVisible(true);
    }
  }, [userRes, repos]); // Executa o efeito apenas quando userRes muda

  // Verifica se os dados do usuário estão disponíveis
  if (!userRes || !userRes) {
    console.log("Dados do usúario não disponivel");
    // Retorna para interromper a renderização se os dados não estiverem prontos
    return;
  }

  return (
    <>
      <div
        className="containerProfile"
        //
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="headerProfile">
          <button
            className="closer"
            // Evento para alterar o estado de isVisible para false, assim ocultado o componente.
            onClick={() => {
              setIsVisible(false);
            }}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>

        <section className="containerData">
          <div className="containerInfo">
            <img src={userRes.avatar_url} alt="" />
            <a href={userRes.html_url} target="_blank">
              <h1>{userRes.login}</h1>
            </a>
            <p>{userRes.bio}</p>
          </div>

          <div className="containerRepos">
            <h2>Repositórios</h2>
            {repos.length > 0 ? (
              repos.map((repo) => (
                <div key={repo.id} className="repo">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </div>
              ))
            ) : (
              <p>Sem repositórios para exibir</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
