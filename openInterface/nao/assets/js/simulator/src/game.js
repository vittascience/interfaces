var $builtinmodule = function () {
    const game = {};

    game.__name__ = new Sk.builtin.str("game");

    // TODO update this part with code friendly. It will be easier and more scalable than this
    game.countries = new Sk.builtin.dict([
        new Sk.builtin.str("france"), new Sk.builtin.dict([
            new Sk.builtin.str("capital"), new Sk.builtin.str("Paris"),
            new Sk.builtin.str("pronounced"), new Sk.builtin.str("de la France"),
            new Sk.builtin.str("continent"), new Sk.builtin.str("Europe"),
            new Sk.builtin.str("hint"), new Sk.builtin.str("C'est aussi appelée la Ville Lumière"),
            new Sk.builtin.str("population"), new Sk.builtin.str("67 millions"),
        ]),
        new Sk.builtin.str("italy"), new Sk.builtin.dict([
            new Sk.builtin.str("capital"), new Sk.builtin.str("Rome"),
            new Sk.builtin.str("pronounced"), new Sk.builtin.str("de l'Italie"),
            new Sk.builtin.str("continent"), new Sk.builtin.str("Europe"),
            new Sk.builtin.str("hint"), new Sk.builtin.str("C'est la ville des gladiateurs"),
            new Sk.builtin.str("population"), new Sk.builtin.str("60 millions"),
        ]),
        new Sk.builtin.str("spain"), new Sk.builtin.dict([
            new Sk.builtin.str("capital"), new Sk.builtin.str("Madrid"),
            new Sk.builtin.str("pronounced"), new Sk.builtin.str("de l'Espagne"),
            new Sk.builtin.str("continent"), new Sk.builtin.str("Europe"),
            new Sk.builtin.str("hint"), new Sk.builtin.str("C'est la ville des toréadors"),
            new Sk.builtin.str("population"), new Sk.builtin.str("47 millions"),
        ]),
        new Sk.builtin.str("portugal"), new Sk.builtin.dict([
            new Sk.builtin.str("capital"), new Sk.builtin.str("Lisbonne"),
            new Sk.builtin.str("pronounced"), new Sk.builtin.str("du Portugal"),
            new Sk.builtin.str("continent"), new Sk.builtin.str("Europe"),
            new Sk.builtin.str("hint"), new Sk.builtin.str("C'est la ville des explorateurs"),
            new Sk.builtin.str("population"), new Sk.builtin.str("10 millions"),
        ]),
        new Sk.builtin.str("germany"), new Sk.builtin.dict([
            new Sk.builtin.str("capital"), new Sk.builtin.str("Berlin"),
            new Sk.builtin.str("pronounced"), new Sk.builtin.str("de l'Allemagne"),
            new Sk.builtin.str("continent"), new Sk.builtin.str("Europe"),
            new Sk.builtin.str("hint"), new Sk.builtin.str("C'est une ville divisée en deux jusqu'en 1989"),
            new Sk.builtin.str("population"), new Sk.builtin.str("83 millions"),
        ]),
        new Sk.builtin.str("united_kingdom"), new Sk.builtin.dict([
            new Sk.builtin.str("capital"), new Sk.builtin.str("Londres"),
            new Sk.builtin.str("pronounced"), new Sk.builtin.str("du Royaume-Uni"),
            new Sk.builtin.str("continent"), new Sk.builtin.str("Europe"),
            new Sk.builtin.str("hint"), new Sk.builtin.str("C'est la ville du Big Ben"),
            new Sk.builtin.str("population"), new Sk.builtin.str("67 millions"),
        ]),
        new Sk.builtin.str("japan"), new Sk.builtin.dict([
            new Sk.builtin.str("capital"), new Sk.builtin.str("Tokyo"),
            new Sk.builtin.str("pronounced"), new Sk.builtin.str("du Japon"),
            new Sk.builtin.str("continent"), new Sk.builtin.str("Asie"),
            new Sk.builtin.str("hint"), new Sk.builtin.str("C'est la plus grande mégapole du monde"),
            new Sk.builtin.str("population"), new Sk.builtin.str("126 millions"),
        ]),
        new Sk.builtin.str("china"), new Sk.builtin.dict([
            new Sk.builtin.str("capital"), new Sk.builtin.str("Pékin"),
            new Sk.builtin.str("pronounced"), new Sk.builtin.str("de la Chine"),
            new Sk.builtin.str("continent"), new Sk.builtin.str("Asie"),
            new Sk.builtin.str("hint"), new Sk.builtin.str("C'est la ville de la Cité Interdite"),
            new Sk.builtin.str("population"), new Sk.builtin.str("1,4 milliard"),
        ]),
        new Sk.builtin.str("usa"), new Sk.builtin.dict([
            new Sk.builtin.str("capital"), new Sk.builtin.str("Washington"),
            new Sk.builtin.str("pronounced"), new Sk.builtin.str("des États-Unis"),
            new Sk.builtin.str("continent"), new Sk.builtin.str("Amérique du Nord"),
            new Sk.builtin.str("hint"), new Sk.builtin.str("C'est la ville où se trouve la Maison Blanche"),
            new Sk.builtin.str("population"), new Sk.builtin.str("331 millions"),
        ]),
        new Sk.builtin.str("canada"), new Sk.builtin.dict([
            new Sk.builtin.str("capital"), new Sk.builtin.str("Ottawa"),
            new Sk.builtin.str("pronounced"), new Sk.builtin.str("du Canada"),
            new Sk.builtin.str("continent"), new Sk.builtin.str("Amérique du Nord"),
            new Sk.builtin.str("hint"), new Sk.builtin.str("C'est la ville où se trouve le Parlement canadien"),
            new Sk.builtin.str("population"), new Sk.builtin.str("38 millions"),
        ]),
        new Sk.builtin.str("brazil"), new Sk.builtin.dict([
            new Sk.builtin.str("capital"), new Sk.builtin.str("Brasilia"),
            new Sk.builtin.str("pronounced"), new Sk.builtin.str("du Brésil"),
            new Sk.builtin.str("continent"), new Sk.builtin.str("Amérique du Sud"),
            new Sk.builtin.str("hint"), new Sk.builtin.str("C'est une capitale planifiée construite dans les années 1960"),
            new Sk.builtin.str("population"), new Sk.builtin.str("213 millions"),
        ]),
        new Sk.builtin.str("australia"), new Sk.builtin.dict([
            new Sk.builtin.str("capital"), new Sk.builtin.str("Canberra"),
            new Sk.builtin.str("pronounced"), new Sk.builtin.str("de l'Australie"),
            new Sk.builtin.str("continent"), new Sk.builtin.str("Océanie"),
            new Sk.builtin.str("hint"), new Sk.builtin.str("Ce n'est pas Sydney mais une ville planifiée"),
            new Sk.builtin.str("population"), new Sk.builtin.str("26 millions"),
        ]),
        new Sk.builtin.str("india"), new Sk.builtin.dict([
            new Sk.builtin.str("capital"), new Sk.builtin.str("New Delhi"),
            new Sk.builtin.str("pronounced"), new Sk.builtin.str("de l'Inde"),
            new Sk.builtin.str("continent"), new Sk.builtin.str("Asie"),
            new Sk.builtin.str("hint"), new Sk.builtin.str("C'est la ville du Fort Rouge"),
            new Sk.builtin.str("population"), new Sk.builtin.str("1,4 milliard"),
        ]),
        new Sk.builtin.str("russia"), new Sk.builtin.dict([
            new Sk.builtin.str("capital"), new Sk.builtin.str("Moscou"),
            new Sk.builtin.str("pronounced"), new Sk.builtin.str("de la Russie"),
            new Sk.builtin.str("continent"), new Sk.builtin.str("Europe/Asie"),
            new Sk.builtin.str("hint"), new Sk.builtin.str("C'est la ville du Kremlin"),
            new Sk.builtin.str("population"), new Sk.builtin.str("145 millions"),
        ]),
        new Sk.builtin.str("south_africa"), new Sk.builtin.dict([
            new Sk.builtin.str("capital"), new Sk.builtin.str("Pretoria"),
            new Sk.builtin.str("pronounced"), new Sk.builtin.str("de l'Afrique du Sud"),
            new Sk.builtin.str("continent"), new Sk.builtin.str("Afrique"),
            new Sk.builtin.str("hint"), new Sk.builtin.str("Une des trois capitales de ce pays"),
            new Sk.builtin.str("population"), new Sk.builtin.str("60 millions"),
        ]),
    ]);

    game.dynamic_story1 = new Sk.builtin.dict([
        new Sk.builtin.str("start"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu es dans une forêt sombre, il y a deux chemins devant toi. L'un mène vers une rivière, l'autre vers une grotte. Veux-tu aller à gauche ou à droite ?"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([
                new Sk.builtin.str("river"),
                new Sk.builtin.str("cave")
            ])
        ]),
        new Sk.builtin.str("river"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu arrives à une rivière agitée. Sur la rive, tu vois une vieille barque et un pont suspendu qui semble fragile. Veux-tu utiliser la barque ou traverser le pont ?"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([
                new Sk.builtin.str("boat"),
                new Sk.builtin.str("bridge")
            ])
        ]),
        new Sk.builtin.str("cave"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu entres dans une grotte sombre et froide. Un ours bloque ton chemin. Veux-tu reculer ou essayer de lui donner à manger ?"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([
                new Sk.builtin.str("start"),
                new Sk.builtin.str("feed_bear")
            ])
        ]),
        new Sk.builtin.str("boat"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu montes dans la vieille barque. Au milieu de la rivière, tu aperçois une île avec un coffre. Veux-tu ramer vers l'île ou continuer de traverser la rivière ?"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([
                new Sk.builtin.str("island"),
                new Sk.builtin.str("other_side")
            ])
        ]),
        new Sk.builtin.str("bridge"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu t'engages sur le pont. Il grince sous ton poids, mais tu avances courageusement. En plein milieu, le pont commence à céder. Veux-tu courir pour traverser ou reculer rapidement ?"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([
                new Sk.builtin.str("treasure"),
                new Sk.builtin.str("start")
            ])
        ]),
        new Sk.builtin.str("feed_bear"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu trouves des baies à proximité et les donnes à l'ours. Il se calme et te laisse passer. Derrière lui, tu découvres un tunnel lumineux. Veux-tu l'explorer ou retourner sur tes pas ?"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([
                new Sk.builtin.str("secret_tunnel"),
                new Sk.builtin.str("start")
            ])
        ]),
        new Sk.builtin.str("island"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu arrives sur l'île et ouvres le coffre. Il contient un trésor étincelant. Félicitations, tu as gagné !"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([])
        ]),
        new Sk.builtin.str("other_side"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu arrives sur l'autre rive et découvres un sentier qui mène à un petit village. Veux-tu explorer le village ou revenir sur tes pas ?"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([
                new Sk.builtin.str("village"),
                new Sk.builtin.str("start")
            ])
        ]),
        new Sk.builtin.str("treasure"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu réussis à traverser le pont juste à temps. De l'autre côté, tu trouves un trésor caché dans un vieux tronc d'arbre. Félicitations, tu as gagné !"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([])
        ]),
        new Sk.builtin.str("secret_tunnel"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu entres dans le tunnel lumineux. Il te conduit à une clairière magique remplie de créatures étranges et amicales. Félicitations, tu as découvert un monde secret !"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([])
        ]),
        new Sk.builtin.str("village"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Le village est animé. Les habitants t'accueillent chaleureusement et te montrent un artefact ancien qu'ils protègent depuis des générations. Tu te sens chanceux d'avoir découvert cet endroit."),
            new Sk.builtin.str("choices"), new Sk.builtin.list([])
        ])
    ]);
    
    game.dynamic_story2 = new Sk.builtin.dict([
        new Sk.builtin.str("start"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu te réveilles dans un village étrange. Une vieille femme te dit qu'une amulette magique a été volée. Elle te demande ton aide pour la retrouver. Veux-tu l'aider ou partir explorer seul ?"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([
                new Sk.builtin.str("help_woman"),
                new Sk.builtin.str("explore_alone")
            ])
        ]),
        new Sk.builtin.str("help_woman"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("La vieille femme te remercie et te dit que l'amulette a été vue pour la dernière fois près de la tour abandonnée. Veux-tu aller à la tour ou demander des informations au forgeron ?"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([
                new Sk.builtin.str("tower"),
                new Sk.builtin.str("blacksmith")
            ])
        ]),
        new Sk.builtin.str("explore_alone"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu décides d'explorer seul. Sur le chemin, tu rencontres un marchand itinérant. Il te propose de te vendre une carte de la région. Veux-tu acheter la carte ou continuer ton chemin ?"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([
                new Sk.builtin.str("buy_map"),
                new Sk.builtin.str("continue_path")
            ])
        ]),
        new Sk.builtin.str("tower"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu arrives à la tour abandonnée. À l'intérieur, tu trouves un coffre verrouillé et une note disant : 'La clé est entre les mains du forgeron.' Veux-tu retourner voir le forgeron ou essayer d'ouvrir le coffre par toi-même ?"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([
                new Sk.builtin.str("blacksmith"),
                new Sk.builtin.str("force_chest")
            ])
        ]),
        new Sk.builtin.str("blacksmith"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Le forgeron te donne la clé en échange de ton aide pour réparer une arme. Tu retournes à la tour et ouvres le coffre. À l'intérieur, tu trouves l'amulette magique. Félicitations, tu as gagné !"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([])
        ]),
        new Sk.builtin.str("force_chest"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu forces le coffre, mais une alarme magique se déclenche et t'envoie dans une dimension inconnue. L'histoire se termine ici."),
            new Sk.builtin.str("choices"), new Sk.builtin.list([])
        ]),
        new Sk.builtin.str("buy_map"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu achètes la carte et découvres l'emplacement de la tour abandonnée. Tu y trouves un coffre verrouillé et une note disant : 'La clé est entre les mains du forgeron.' Veux-tu aller voir le forgeron ou essayer d'ouvrir le coffre par toi-même ?"),
            new Sk.builtin.str("choices"), new Sk.builtin.list([
                new Sk.builtin.str("blacksmith"),
                new Sk.builtin.str("force_chest")
            ])
        ]),
        new Sk.builtin.str("continue_path"), new Sk.builtin.dict([
            new Sk.builtin.str("text"), new Sk.builtin.str("Tu continues ton chemin et te perds dans une forêt dense. Tu finis par retrouver le village, mais sans amulette. L'histoire se termine ici."),
            new Sk.builtin.str("choices"), new Sk.builtin.list([])
        ])
    ]);
    
    game.mental_math_numbers = new Sk.builtin.list([
        new Sk.builtin.str("zéro"),
        new Sk.builtin.str("un"),
        new Sk.builtin.str("deux"),
        new Sk.builtin.str("trois"),
        new Sk.builtin.str("quatre"),
        new Sk.builtin.str("cinq"),
        new Sk.builtin.str("six"),
        new Sk.builtin.str("sept"),
        new Sk.builtin.str("huit"),
        new Sk.builtin.str("neuf"),
        new Sk.builtin.str("dix"),
        new Sk.builtin.str("onze"),
        new Sk.builtin.str("douze"),
        new Sk.builtin.str("treize"),
        new Sk.builtin.str("quatorze"),
        new Sk.builtin.str("quinze"),
        new Sk.builtin.str("seize"),
        new Sk.builtin.str("dix-sept"),
        new Sk.builtin.str("dix-huit"),
        new Sk.builtin.str("dix-neuf"),
        new Sk.builtin.str("vingt"),
        new Sk.builtin.str("vingt et un"),
        new Sk.builtin.str("vingt-deux"),
        new Sk.builtin.str("vingt-trois"),
        new Sk.builtin.str("vingt-quatre"),
        new Sk.builtin.str("vingt-cinq"),
        new Sk.builtin.str("vingt-six"),
        new Sk.builtin.str("vingt-sept"),
        new Sk.builtin.str("vingt-huit"),
        new Sk.builtin.str("vingt-neuf"),
        new Sk.builtin.str("trente"),
        new Sk.builtin.str("trente et un"),
        new Sk.builtin.str("trente-deux"),
        new Sk.builtin.str("trente-trois"),
        new Sk.builtin.str("trente-quatre"),
        new Sk.builtin.str("trente-cinq"),
        new Sk.builtin.str("trente-six"),
        new Sk.builtin.str("trente-sept"),
        new Sk.builtin.str("trente-huit"),
        new Sk.builtin.str("trente-neuf"),
        new Sk.builtin.str("quarante"),
        new Sk.builtin.str("quarante et un"),
        new Sk.builtin.str("quarante-deux"),
        new Sk.builtin.str("quarante-trois"),
        new Sk.builtin.str("quarante-quatre"),
        new Sk.builtin.str("quarante-cinq"),
        new Sk.builtin.str("quarante-six"),
        new Sk.builtin.str("quarante-sept"),
        new Sk.builtin.str("quarante-huit"),
        new Sk.builtin.str("quarante-neuf"),
        new Sk.builtin.str("cinquante")
    ]);
    

    return game;
};
