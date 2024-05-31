export default function UserProfile({ params }: any) {
	return (
		<div className="flex flex-col items-center justify-center mt-20 py-2">
			<h1 className="text-3xl">Profile Details</h1>
			<hr />
			<p className="text-2xl mt-10">
				User Id:
				<span className=" p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
			</p>
		</div>
	)
}
