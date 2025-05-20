const express = require("express");
const path = require('path');
const multer = require("multer");
const fs = require('fs');
const cors = require("cors");
const sequelize = require("./config/database");
const Usuario = require("./models/usuario");
const Alunos = require("./models/alunos");
const { log } = require("console");

// ===========================================
// 1. CONFIGURAÇÃO INICIAL
// ===========================================

// Cria diretório de uploads
const uploadDir = path.join(__dirname, './uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } 
});

// ===========================================
// 2. INICIALIZAÇÃO DO EXPRESS
// ===========================================
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(uploadDir));

// ===========================================
// 3. SINCRONIZAÇÃO DO BANCO DE DADOS
// ===========================================
sequelize.sync()
  .then(() => console.log("✅ Banco sincronizado"))
  .catch(err => console.error("❌ Erro de sincronização:", err));

// ===========================================
// 4. ROTAS
// ===========================================

// --- Rota de Login ---
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email, senha } });

    if (usuario) {
      res.status(200).json({ success: true, user: usuario });
    } else {
      res.status(401).json({ success: false, message: "Credenciais inválidas" });
    }
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ success: false, message: "Erro interno" });
  }
});

// --- Rota de Usuários ---
app.post("/usuarios", async (req, res) => {
  try {
    const { nome, email, senha, confirmSenha } = req.body;
    const novoUsuario = await Usuario.create({ nome, email, senha, confirmSenha });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro no cadastro" });
  }
});

// --- Rota de Alunos ---
app.post("/alunos", upload.fields([
  { name: "foto_aluno", maxCount: 1 },
  { name: "doc_bloco_1", maxCount: 1 },
  { name: "doc_bloco_2", maxCount: 1 },
  { name: "doc_bloco_3", maxCount: 1 }
]), async (req, res) => {
  try {
    // Processamento dos arquivos
    const files = {
      foto_aluno: req.files["foto_aluno"]?.[0]?.filename || null,
      doc_bloco_1: req.files["doc_bloco_1"]?.[0]?.filename || null,
      doc_bloco_2: req.files["doc_bloco_2"]?.[0]?.filename || null,
      doc_bloco_3: req.files["doc_bloco_3"]?.[0]?.filename || null,
    };

    // Criação do aluno no banco
    const aluno = await Alunos.create({
      ...req.body,
      ...files
    });

    res.status(201).json({
      success: true,
      data: aluno,
      message: "Aluno cadastrado com sucesso!"
    });

  } catch (error) {
    // Limpeza de arquivos em caso de erro
    if (req.files) {
      Object.values(req.files).forEach(files => {
        files.forEach(file => {
          fs.unlinkSync(path.join(uploadDir, file.filename));
        });
      });
    }

    console.error("Erro no cadastro:", error);
    res.status(500).json({
      success: false,
      message: "Falha no cadastro",
      error: error.message
    });
  }
});

// ===========================================
// 5. TRATAMENTO DE ERROS GLOBAL
// ===========================================
app.use((err, req, res, next) => {
  console.error("‼️ Erro global:", err);
  res.status(500).json({
    success: false,
    message: "Erro interno no servidor",
    error: err.message
  });
});

// ===========================================
// 6. INICIALIZAÇÃO DO SERVIDOR
// ===========================================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});


//=====================================================
// 7 . resquisições GETs
//=====================================================
app.get('/consulta', async (req, res) => {
  const aluno = await Alunos.findOne({where: req.query})
  res.status(200).json(aluno)
})