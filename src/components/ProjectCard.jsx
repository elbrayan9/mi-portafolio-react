function ProjectCard({ project }) {
  const { title, description, image, tags, liveUrl, repoUrl } = project;

  return (
    <div
      className="bg-[#222] rounded-lg overflow-hidden border border-[#444] 
                    transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl
                    flex flex-col"
    >
      <img src={image} alt={title} className="w-full h-52 object-cover" />

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-primary-color mb-2">{title}</h3>
        <p className="text-secondary-color mb-5 flex-grow">{description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#333] text-xs font-mono px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="project-links space-x-5">
          {liveUrl !== "#" && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-color font-semibold hover:underline"
            >
              Ver Demo
            </a>
          )}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-color font-semibold hover:underline"
          >
            Ver Código
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
