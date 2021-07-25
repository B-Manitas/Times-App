// Import Libraries.
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

// Import Customs Components.
import ContainerPage from "../components/ContainerPage";
import HeaderBack from "../components/HeaderBack";

// Import Constants.
import { COLORS_APP } from "../utils/ConstantColors";

const LegalPage = ({ navigation }) => {
  return (
    <ContainerPage>
      <HeaderBack onPress={navigation.goBack} key_text={"legal_notice"} />

      <ScrollView style={styles.ctn_body} showsVerticalScrollIndicator={false}>
        <Text style={styles.txt_title}>
          Contrat de licence applicable à compter du 16 juillet 2021.
        </Text>

        <Text style={styles.txt_title}>Logiciel / application :</Text>
        <Text style={styles.txt_paragraph}>
          Time’s App (ci-après désigné le logiciel).
        </Text>

        <Text style={styles.txt_title}>Auteur du logiciel :</Text>
        <Text style={styles.txt_paragraph}>M. Bahri</Text>

        <Text style={styles.txt_title}>Éditeur du logiciel :</Text>
        <Text style={styles.txt_paragraph}>
          M. Bahri (ci-après désigné l’éditeur).
        </Text>

        <Text style={styles.txt}>
          IMPORTANT – L’installation ou l’utilisation du logiciel impliquent
          l’acceptation sans réserve du contrat de licence. Ce contrat est
          également applicable à toute mise à jour ultérieure ou toute nouvelle
          version du logiciel. Le contrat de licence est conclu entre l’éditeur
          du logiciel et l’utilisateur de ce logiciel.
        </Text>
        <Text style={styles.txt}>
          Propriété intellectuelle – Licence d’utilisation L’éditeur est le
          détenteur exclusif des droits patrimoniaux de propriété intellectuelle
          du logiciel et de l’intégralité des contenus incorporés au logiciel,
          sauf éventuelle mention contraire. L’éditeur conserve la propriété du
          logiciel ainsi que des contenus incorporés au logiciel et consent à
          l’utilisateur une licence d’utilisation non exclusive du logiciel et
          des contenus. Cette licence est incessible. L’utilisateur n’est pas
          autorisé à concéder de sous-licence. La licence est consentie pour
          indéterminée. La licence sera résiliée, immédiatement et
          automatiquement, sans formalité, en cas de manquement de l’utilisateur
          au présent contrat. L’éditeur se réserve tous les droits qui ne sont
          pas expressément conférés à l’utilisateur par le présent contrat.
        </Text>
        <Text style={styles.txt}>
          Avertissement – Consignes d’utilisation. L’utilisateur est tenu
          d’utiliser le logiciel dans le respect des lois et règlements
          applicables en France et à l’endroit où le logiciel est utilisé. Le
          logiciel n’est pas conçu pour être utilisé dans des situations où des
          dysfonctionnements, erreurs ou inexactitudes du logiciel pourraient
          causer des préjudices quelconques.
        </Text>
        <Text style={styles.txt}>
          Utilisation autorisée – L’utilisateur est autorisé à installer le
          logiciel sur un appareil compatible et à utiliser les fonctionnalités
          du logiciel prévues par l’éditeur. Toute autre utilisation du logiciel
          non expressément autorisée par l’éditeur, est interdite. En
          particulier, sont proscrits : la copie de tout ou partie du logiciel,
          l’ingénierie inverse, la décompilation, le désassemblage du logiciel,
          le déchiffrage ou la modification du code source. L’utilisateur est
          autorisé à consulter les contenus (notamment les textes, sons,
          photographies, vidéos, dessins, cartes et autres représentations
          graphiques) dans le logiciel. Toute autre utilisation des contenus non
          expressément autorisée par l’éditeur, est interdite. En particulier,
          il est proscrit d’extraire les contenus du logiciel. L’éditeur se
          réserve le droit exclusif de corriger les éventuelles erreurs
          affectant le logiciel.
        </Text>
        <Text style={styles.txt}>
          Configuration – pré-requis techniques Le logiciel est conçu pour
          fonctionner avec les systèmes d’exploitation suivants : IOS 12.5.4 ou
          une version ultérieure.
        </Text>
        <Text style={styles.txt}>
          Données personnelles – Tous les paiements effectués correspondent à
          une redevance pour l’utilisation du logiciel ou des services intégrés
          ou la consultation des contenus et en aucun cas à une cession de
          droits. Le paiement est dû d’avance, avant le téléchargement du
          logiciel. Tout paiement est définitif et ne peut pas faire l’objet
          d’un remboursement pour quelque motif que ce soit.
        </Text>
        <Text style={styles.txt}>
          Modalités et délai de mise à disposition du logiciel – Le logiciel est
          mis à la disposition de l’utilisateur sur la plateforme de
          téléchargement Apple Store, immédiatement après i) l’acceptation du
          présent contrat de licence et des conditions de la plateforme, ii) le
          téléchargement et l’installation du logiciel.
        </Text>
        <Text style={styles.txt}>
          Renonciation au droit de rétractation – L’utilisateur ne bénéficie pas
          d’un droit de rétractation, quand bien même cet utilisateur est une
          personne physique agissant en qualité de consommateur, conformément à
          l’article L. 221-28 13° du code de la consommation. EN INSTALLANT LE
          LOGICIEL, LE CONSOMMATEUR DEMANDE LA FOURNITURE IMMÉDIATE D’UN CONTENU
          NUMÉRIQUE ET RENONCE EXPRESSÉMENT À SON DROIT DE RÉTRACTATION.
        </Text>
        <Text style={styles.txt}>
          Conditions d’utilisation de la plateforme de téléchargement – Les
          conditions d’utilisation de la plateforme sur laquelle le logiciel est
          commercialisé sont applicables. L’utilisateur est invité à en prendre
          connaissance. L’installation ou l’utilisation du logiciel suppose
          l’acceptation de ces conditions.
        </Text>
        <Text style={styles.txt}>
          Logiciels et services de tiers – Nous remercions la plateforme
          Flaticon.com, mettons à disposition des icones gratuitement, sous
          condition de mentionner les auteurs. Les icones ont été conçus par
          Freepik, dont l’adresse du site est la suivante :
          https://www.freepik.com. De plus, nous remercions également la
          plateforme https://mixkit.co/ qui nous permet d’utiliser ses sons sous
          la licence Mixkit.
        </Text>
        <Text style={styles.txt}>
          Exclusion de garantie et de responsabilité – L’éditeur apporte tous
          ses soins au logiciel et aux contenus incorporés au logiciel.
          Cependant, il ne consent aucune garantie quant au logiciel et quant
          aux contenus. En particulier, l’éditeur ne garantit pas que le
          logiciel et les contenus sont exacts, complets, à jour, exempts
          d’erreurs, adaptés aux besoins de l’utilisateur. Dans toute la mesure
          permise par les dispositions applicables, l’éditeur n’assume aucune
          responsabilité quant aux conséquences qui pourraient résulter de
          l’utilisation du logiciel ou d’un dysfonctionnement quelconque du
          logiciel, ou d’une erreur ou omission affectant les contenus
          incorporés au logiciel. L’éditeur veille à la modération des
          commentaires, photographies, vidéos et autres contenus qui pourraient
          être diffusés via le logiciel par des utilisateurs. Cependant,
          l’éditeur n’est en aucun cas responsable de ces contenus et sa
          responsabilité ne peut pas être engagée de ce fait.
        </Text>
        <Text style={styles.txt}>
          Durée – Le présent contrat est conclu pour la durée de la licence
          concédée à l’utilisateur
        </Text>
        <Text style={styles.txt}>
          Modifications – L’éditeur peut modifier le présent contrat au cours de
          son exécution, sous réserve de le notifier à l’utilisateur. La
          notification pourra intervenir par tout moyen, y compris sous la forme
          d’une notification dans le logiciel. Les modifications entreront en
          vigueur au terme d’un délai de quinze jours à compter de la
          notification. L’utilisateur pourra s’opposer aux modifications en
          désinstallant le logiciel.
        </Text>
        <Text style={styles.txt}>
          Langue – Le présent contrat est rédigé exclusivement en langue
          française. Cette langue est utilisée durant la relation
          précontractuelle ainsi que pour la conclusion du contrat
        </Text>
        <Text style={styles.txt}>
          Traitement des réclamations – Les réclamations peuvent être adressées
          à l’éditeur en utilisant les coordonnées suivantes :
          timesapp.contact@gmail.com. L’éditeur s’efforcera de traiter ces
          réclamations dans les meilleurs délais et d’y apporter une réponse
          appropriée.
        </Text>
        <Text style={styles.txt}>
          Règlement des différends – En cas de contestation, les parties
          pourront recourir à une procédure de médiation conventionnelle ou à
          tout autre mode alternatif de règlement des différends. Le
          consommateur a le droit de recourir gratuitement à un médiateur de la
          consommation en vue de la résolution amiable du litige qui l’oppose à
          un professionnel, en vertu de l’article L. 612-1 du code de la
          consommation. L’éditeur garantit au consommateur le recours effectif à
          un dispositif de médiation de la consommation. Les juridictions
          compétentes pour la ville Paris seront exclusivement compétentes pour
          connaître de tout litige se rapportant au présent contrat, ou aux
          relations pré-contractuelles intervenues entre les parties.
        </Text>
        <Text style={styles.txt}>
          Droit applicable – Le droit français régit les relations
          précontractuelles entre l’utilisateur et l’éditeur, ainsi que le
          présent contrat
        </Text>
        <Text style={styles.txt}>
          Conclusion du contrat – Le contrat est réputé conclu pour l’éditeur à
          son siège social et pour le consommateur à son domicile, lors du
          téléchargement du logiciel, à la date de ce téléchargement.
        </Text>
      </ScrollView>
    </ContainerPage>
  );
};

export default LegalPage;

const styles = StyleSheet.create({
  ctn_body: {
    marginBottom: 20,
    paddingTop: 0,
    marginHorizontal: 20,
    flex: 1,
  },

  txt_title: {
    marginTop: 20,
    fontWeight: "bold",
    color: COLORS_APP.font_main,
    textDecorationLine: "underline",
  },

  txt_paragraph: {
    color: COLORS_APP.font_main,
    marginBottom: 5,
  },

  txt: {
    marginTop: 15,
    color: COLORS_APP.font_main,
    textAlign: "justify",
  },
});
