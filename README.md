
# MoneyPad API

API [gRPC](https://grpc.io/) desenvolvida para matéria de Desenvolvimento de Microsserviços e APIs da MBA em Mobile Development utilizando NodeJS e @grpc/grpc-js.

**OBS.:** Para rodar esse projeto, será necessário adicionar as seguintes variáveis de ambiente no arquivo `.env`: chave secreta para criptografia (`SECRET`) e url de conexão com banco de dados (`URLDB`).

### Tecnologias utilizadas

- Persistência de dados com [MongoDB](https://www.mongodb.com/pt-br) e [Mongoose](https://www.npmjs.com/package/mongoose)
- Validação de JWT Token com [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- Cliente gRPC com [@grpc/grpc-js](https://www.npmjs.com/package/@grpc/grpc-js) e [@grpc/proto-loader](https://www.npmjs.com/package/@grpc/proto-loader)
- Configuração das variáveis do projeto com [dotenv-safe](https://www.npmjs.com/package/dotenv-safe)


### Métodos gRPC disponíveis

* #### Obter lista de informações financeiras

| Método                | Parâmetro               | Retorno        |
| :-------------------- | :---------------------- | :------------- |
| `GetAllBanks`         |                         | `BankInfoList` |

*Exemplo de request*
```
{}
```
* #### Obter lista de informações financeiras de determinado investidor

| Método                | Parâmetro               | Retorno        |
| :-------------------- | :---------------------- | :------------- |
| `GetAllInvestorBanks` | `BankInfoRequest`       | `BankInfoList` |

*Exemplo de request*
```
{
	"investorId": "investorid"
}
```

* #### Obter lista de informações financeiras específicas de um determinado investidor e banco
| Método                | Parâmetro               | Retorno        |
| :-------------------- | :---------------------- | :------------- |
| `GetSpecificBankInfo` | `BankInfoRequest`       | `BankInfoList` |

*Exemplo de request*
```
{
	"bankname": "bank name",
	"apikey": "apikey"
}
```

* #### Inserir nova informação financeira
| Método                | Parâmetro               | Retorno        |
| :-------------------- | :---------------------- | :------------- |
| `InsertBankInfo`      | `BankInfo`              | `BankInfo`     |

*Exemplo de request*
```
{
	"bankname": "bank name",
	"accounttype": "account type",
	"holdername": "holder name",
	"limitcard": "R$ 00,00",
	"apikey": "apikey"
}
```

* #### Atualizar informação financeira

| Método                | Parâmetro               | Retorno        |
| :-------------------- | :---------------------- | :------------- |
| `UpdateBankInfo`      | `UpdateBankInfoRequest` | `BankInfo`     |

*Exemplo de request*
```
{
	"id": "id",
	"bankInfo": {
		"bankname": "bank name",
		"accounttype": "account type",
		"holdername": "holder name",
		"limitcard": "R$ 00,00",
		"apikey": "apikey"
	}
}
```