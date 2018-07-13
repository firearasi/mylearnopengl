#version 460 core


uniform vec3 viewPos;

in vec4 position;
in vec3 normal;
in vec3 fragPos;
in vec2 texCoord;



out vec4 color;

uniform float u_time;

struct Material {
	sampler2D diffuse;
	sampler2D specular;
	sampler2D emissive;
	float shininess;
};

uniform Material material;

struct Light {
	vec3 source;
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;

	float constant;
	float linear;
	float quadratic;

	vec3 direction;
	float cutOff;
	float outerCutOff;
};

uniform Light light;

void main()
{	
	
	// Lighting maps
	vec4 diffuseMap = texture(material.diffuse, texCoord);
	vec4 specularMap = texture(material.specular, texCoord);
	vec4 emissiveMap = texture(material.emissive, texCoord);
		
	// Attenuation
	float d = length(light.source - fragPos);
	float att = 1.0/(light.constant + light.linear * d + light.quadratic * pow(d, 2));
	// Ambient lighting
	
	vec4 ambient = light.ambient;
	
	// Diffuse lighting
	
	vec3 normalVec = normalize(normal);
	vec3 lightDir = normalize(light.source-fragPos);
	
	float theta = dot(lightDir, normalize(-light.direction));
	vec4 result;
	if (theta >= light.outerCutOff) 
	{
		vec4 diffuse = vec4(0.0);
		diffuse = max(dot(normalVec, lightDir), 0) * light.diffuse;
		

		// Specular lighting
		
		vec3 viewDir = normalize(viewPos - fragPos);
		vec3 reflectedDir = reflect(-lightDir, normalVec);
		vec4 specular = 2.0 * pow(max(dot(viewDir, reflectedDir), 0), material.shininess) * light.specular;
		
		

		result = ambient * diffuseMap  + (diffuse * diffuseMap + specular * max(vec4(0.2, 0.2, 0.2, 0.2), specularMap))*att * smoothstep(light.outerCutOff, light.cutOff, theta);
	
		//vec4 result = ambient * diffuseMap + diffuse * diffuseMap + specular * max(vec4(0.2, 0.2, 0.2, 0.2), specularMap) + emissiveMap;
	}
	else 
	{
		result = ambient * diffuseMap;
	}
		color = result;
}	
