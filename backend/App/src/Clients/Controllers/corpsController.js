const express = require("express");
const Corps = require("../Models/corpsModel")
const asyncHandler = require("express-async-handler");


// @desc    Get all corps
// @route   GET /api/corps
// @access  Public
const getCorps = asyncHandler(async (req, res) => {
    const corps = await Corps.find({}).populate('iduser');
    res.json(corps);
}
);

// @desc    Get corps by ID
// @route   GET /api/corps/:id
// @access  Public
const getCorpsById = asyncHandler(async (req, res) => {
    const corps = await Corps.findById(req.params.id).populate('User');
    if (corps) {
        res.json(corps);
    } else {
        res.status(404);
        throw new Error("Corps not found");
    }
}
);
// getcorps byiduser
const getCorpsByIdUser = asyncHandler(async (req, res) => {
    // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
    const userId = req.params._id;
  
    try {
      // Effectuer une recherche dans la base de données pour récupérer le corps associé à l'ID de l'utilisateur
      const corps = await Corps.findOne({ userId });

  
      // Vérifier si un corps a été trouvé
      if (corps) {
        // Retourner le corps en tant que réponse
        res.status(200).json(corps);
      } else {
        // Si aucun corps n'a été trouvé, retourner un message d'erreur
        res.status(404).json({ message: "Aucun corps trouvé pour cet utilisateur" });
      }
    } catch (error) {
      // Gérer les erreurs de manière appropriée
      res.status(500).json({ message: "Une erreur s'est produite lors de la récupération du corps", error });
    }
  });
  
  
  
  

// @desc    Delete a corps
// @route   DELETE /api/corps/:id
// @access  Private/Admin
const deleteCorps = asyncHandler(async (req, res) => {
    const corps = await Corps.findById(req.params.id);
    if (corps) {
        await corps.remove();
        res.json({ message: "Corps removed" });
    } else {
        res.status(404);
        throw new Error("Corps not found");
    }
}
);

// @desc    Create a corps
// @route   POST /api/corps
// @access  Private/Client
const createCorps = asyncHandler(async (req, res) => {
    // Récupérer les données du corps à partir du corps de la requête
    const { age, sexe, poits, taille } = req.body;
  
    // Calculer l'IMC
    const poids = parseFloat(poits);
    const imc = poids / (taille * taille);
  
    // Créer un nouvel objet Corps avec les données et l'IMC calculé
    const corps = new Corps({
      iduser: req.user._id,
      age,
      sexe,
      poits,
      taille,
      imc: imc.toFixed(2), // Arrondir à 2 décimales
    });
  
    // Sauvegarder le nouvel objet Corps dans la base de données
    const createdCorps = await corps.save();
  
    // Retourner le nouvel objet Corps créé avec l'IMC calculé dans la réponse
    res.status(201).json(createdCorps);
  });

// @desc    Update a corps
// @route   PUT /api/corps/:id
// @access  Private/Client
const updateCorps = asyncHandler(async (req, res) => {
    const { age, sexe, poits, taille } = req.body;
    const corps = await Corps.findById(req.params.id);
    if (corps) {
        corps.age = age;
        corps.sexe = sexe;
        corps.poits = poits;
        corps.taille = taille;
        const updatedCorps = await corps.save();
        res.json(updatedCorps);
    } else {
        res.status(404);
        throw new Error("Corps not found");
    }
}
);

// clculer  age, sexe, poits, taille 
const calculerimc = asyncHandler(async (req, res) => {
    const corps = await Corps.findById(req.params.id);
    if (corps) {
        const age = corps.age;
        const sexe = corps.sexe;
        const poits = corps.poits;
        const taille = corps.taille;
        const imc = poits / (taille * taille);

        if (sexe == "homme") {
            if (age >= 18 && age <= 24) {
                if (imc < 20.7) {
                    res.json("maigre");
                } else if (imc >= 20.7 && imc <= 26.4) {
                    res.json("normal");
                } else if (imc >= 26.5 && imc <= 27.8) {
                    res.json("surpoids");
                } else if (imc >= 27.9 && imc <= 31.1) {
                    res.json("obésité modérée");
                } else if (imc >= 31.2 && imc <= 34.9) {
                    res.json("obésité sévère");
                } else if (imc >= 35) {
                    res.json("obésité morbide");
                }
            } else if (age >= 25 && age <= 34) {
                if (imc < 21.1) {
                    res.json("maigre");
                } else if (imc >= 21.1 && imc <= 26.7) {
                    res.json("normal");
                } else if (imc >= 26.8 && imc <= 28.1) {
                    res.json("surpoids");
                } else if (imc >= 28.2 && imc <= 31.4) {
                    res.json("obésité modérée");
                } else if (imc >= 31.5 && imc <= 35.2) {
                    res.json("obésité sévère");
                } else if (imc >= 35.3) {
                    res.json("obésité morbide");
                }
            } else if (age >= 35 && age <= 44) {
                if (imc < 21.5) {
                    res.json("maigre");
                } else if (imc >= 21.5 && imc <= 27.1) {
                    res.json("normal");
                } else if (imc >= 27.2 && imc <= 28.5) {
                    res.json("surpoids");
                } else if (imc >= 28.6 && imc <= 31.8) {
                    res.json("obésité modérée");
                } else if (imc >= 31.9 && imc <= 35.6) {
                    res.json("obésité sévère");
                } else if (imc >= 35.7) {
                    res.json("obésité morbide");
                }
            } else if (age >= 45 && age <= 54) {
                if (imc < 21.9) {
                    res.json("maigre");
                } else if (imc >= 21.9 && imc <= 27.5) {
                    res.json("normal");
                } else if (imc >= 27.6 && imc <= 28.9) {
                    res.json("surpoids");
                } else if (imc >= 29 && imc <= 32.2) {
                    res.json("obésité modérée");
                } else if (imc >= 32.3 && imc <= 36) {
                    res.json("obésité sévère");
                } else if (imc >= 36.1) {
                    res.json("obésité morbide");
                }
            } else if (age >= 55 && age <= 64) {
                if (imc < 22.3) {
                    res.json("maigre");
                } else if (imc >= 22.3 && imc <= 27.9) {
                    res.json("normal");
                } else if (imc >= 28 && imc <= 29.3) {
                    res.json("surpoids");
                } else if (imc >= 29.4 && imc <= 32.6) {
                    res.json("obésité modérée");
                } else if (imc >= 32.7 && imc <= 36.4) {
                    res.json("obésité sévère");
                } else if (imc >= 36.5) {
                    res.json("obésité morbide");
                }
            } else if (age >= 65) {
                if (imc < 22.7) {
                    res.json("maigre");
                } else if (imc >= 22.7 && imc <= 28.3) {
                    res.json("normal");
                } else if (imc >= 28.4 && imc <= 29.7) {
                    res.json("surpoids");
                } else if (imc >= 29.8 && imc <= 33) {
                    res.json("obésité modérée");
                } else if (imc >= 33.1 && imc <= 36.8) {
                    res.json("obésité sévère");
                } else if (imc >= 36.9) {
                    res.json("obésité morbide");
                }
            }
        } else if (sexe == "femme") {
            if (age >= 18 && age <= 24) {
                if (imc < 19.1) {
                    res.json("maigre");
                } else if (imc >= 19.1 && imc <= 24.8) {
                    res.json("normal");
                } else if (imc >= 24.9 && imc <= 26.4) {
                    res.json("surpoids");
                } else if (imc >= 26.5 && imc <= 29.7) {
                    res.json("obésité modérée");

                } else if (imc >= 29.8 && imc <= 33.5) {
                    res.json("obésité sévère");
                } else if (imc >= 33.6) {
                    res.json("obésité morbide");
                }
            } else if (age >= 25 && age <= 34) {
                if (imc < 19.5) {
                    res.json("maigre");
                } else if (imc >= 19.5 && imc <= 25.2) {
                    res.json("normal");
                } else if (imc >= 25.3 && imc <= 26.8) {
                    res.json("surpoids");
                } else if (imc >= 26.9 && imc <= 30.1) {
                    res.json("obésité modérée");
                } else if (imc >= 30.2 && imc <= 33.9) {
                    res.json("obésité sévère");
                } else if (imc >= 34) {
                    res.json("obésité morbide");
                }
            } else if (age >= 35 && age <= 44) {
                if (imc < 19.9) {
                    res.json("maigre");
                } else if (imc >= 19.9 && imc <= 25.6) {
                    res.json("normal");
                } else if (imc >= 25.7 && imc <= 27.2) {
                    res.json("surpoids");
                } else if (imc >= 27.3 && imc <= 30.5) {
                    res.json("obésité modérée");
                } else if (imc >= 30.6 && imc <= 34.3) {
                    res.json("obésité sévère");
                } else if (imc >= 34.4) {
                    res.json("obésité morbide");
                }
            } else if (age >= 45 && age <= 54) {
                if (imc < 20.3) {
                    res.json("maigre");
                } else if (imc >= 20.3 && imc <= 26) {
                    res.json("normal");
                } else if (imc >= 26.1 && imc <= 27.6) {
                    res.json("surpoids");
                } else if (imc >= 27.7 && imc <= 30.9) {
                    res.json("obésité modérée");
                } else if (imc >= 31 && imc <= 34.7) {
                    res.json("obésité sévère");
                } else if (imc >= 34.8) {
                    res.json("obésité morbide");
                }
            } else if (age >= 55 && age <= 64) {
                if (imc < 20.7) {
                    res.json("maigre");
                } else if (imc >= 20.7 && imc <= 26.4) {
                    res.json("normal");
                } else if (imc >= 26.5 && imc <= 28) {
                    res.json("surpoids");
                } else if (imc >= 28.1 && imc <= 31.3) {
                    res.json("obésité modérée");
                } else if (imc >= 31.4 && imc <= 35.1) {
                    res.json("obésité sévère");
                } else if (imc >= 35.2) {
                    res.json("obésité morbide");
                }
            } else if (age >= 65) {
                if (imc < 21.1) {
                    res.json("maigre");
                } else if (imc >= 21.1 && imc <= 26.8) {
                    res.json("normal");
                } else if (imc >= 26.9 && imc <= 28.4) {
                    res.json("surpoids");
                } else if (imc >= 28.5 && imc <= 31.7) {
                    res.json("obésité modérée");
                } else if (imc >= 31.8 && imc <= 35.5) {
                    res.json("obésité sévère");
                } else if (imc >= 35.6) {
                    res.json("obésité morbide");
                }
            }
        }
    } else {
        res.json("Veuillez remplir tous les champs");
    }
});


module.exports = {
    getCorps,
    getCorpsById,
    deleteCorps,
    createCorps,
    updateCorps,
    calculerimc,
    getCorpsByIdUser
};

