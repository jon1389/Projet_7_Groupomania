import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";

export default function DeleteComment(comments) {
	const token = sessionStorage.getItem("token");
	const id = comments.comment.id;
	const HandleUpdate = comments.postContent.HandleUpdate;

	/// Supprimer un commentaire ///
	const deleteComment = () => {
		const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire?");
		if (!confirmation) return console.log("Votre commentaire n'a pas été supprimé");
		Axios.delete(`http://localhost:5000/api/comments/` + id, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then(() => {
				console.log("Commentaire supprimé");
				HandleUpdate();
			})
			.catch((err) => {
				console.log(err, "Vous ne pouvez pas supprimer ce commentaire");
				window.alert("Vous ne pouvez pas supprimer ce commentaire");
			});
	};
	return (
		<>
			<FontAwesomeIcon
				htmlFor="image"
				icon={faTrashAlt}
				className="comment__delete"
				onClick={() => deleteComment()}
				role="button"
			/>
		</>
	);
}
