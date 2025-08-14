const AuthImagePattern = ({ title, subtitle, messages, callToAction }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/10 to-base-200 p-8">
      <div className="max-w-lg text-center space-y-6">
        {/* Title and Subtitle */}
        <h2 className="text-3xl font-bold text-base-content">{title}</h2>
        <p className="text-lg text-base-content/60">{subtitle}</p>

        {/* Dynamic Messages */}
        <div className="space-y-4 bg-base-100 p-6 rounded-xl shadow-lg">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start gap-3">
              <message.icon className="size-6 text-primary mt-1" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-base-content">
                  {message.title}
                </h3>
                <p className="text-base-content/60">{message.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <p className="text-base-content/80 font-medium">{callToAction}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;