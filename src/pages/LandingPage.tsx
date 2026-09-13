import {
  Container,
  Title,
  Text,
  Button,
  Group,
  SimpleGrid,
  Card,
  Badge,
  ThemeIcon,
  Box,
  useMantineTheme,
  Stack,
  Grid,
  Paper,
  List,
  Timeline,
  Divider,
  Affix,
  Transition,
} from "@mantine/core";
import {
  IconArrowRight,
  IconCode,
  IconBriefcase,
  IconUserCircle,
  IconTrophy,
  IconCertificate,
  IconUsers,
  IconSettings,
  IconMapPin,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useWindowScroll } from "@mantine/hooks";

export default function LandingPage() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [scroll] = useWindowScroll();

  return (
    <Box
      bg={theme.colors.gray[0]}
      style={{ minHeight: "100vh", paddingBottom: 100 }}
    >
      {/* Navbar Section */}
      <Box
        bg="white"
        py="md"
        style={{
          borderBottom: `1px solid ${theme.colors.gray[2]}`,
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Container size="lg">
          <Group justify="space-between">
            <Group gap="sm">
              <IconCode size={28} color="var(--mantine-color-blue-6)" />
              <Text
                fw={800}
                size="xl"
                c="dark.9"
                style={{ letterSpacing: -0.5 }}
              >
                MyProfile
              </Text>
            </Group>
            <Group gap="lg" visibleFrom="sm">
              <Text fw={600} size="sm" style={{ cursor: "pointer" }} onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}>
                Home
              </Text>
              <Text fw={600} size="sm" c="dimmed" style={{ cursor: "pointer" }} onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                About
              </Text>
              <Text fw={600} size="sm" c="dimmed" style={{ cursor: "pointer" }} onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                Portfolio
              </Text>
              <Button
                variant="light"
                color="blue"
                onClick={() => navigate("/login")}
                radius="xl"
                size="sm"
              >
                Login / Admin
              </Button>
            </Group>
          </Group>
        </Container>
      </Box>

      <Container size="lg" mt={50} id="home">
        <Grid>
          {/* Left Column - Photo & Skills */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="xl">
              <Paper
                shadow="xl"
                p={0}
                radius="md"
                withBorder
                style={{
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "white",
                }}
              >
                {/* Placeholder Image using Box with Gradient & Icon */}
                <Box
                  h={350}
                  style={{
                    background:
                      "linear-gradient(135deg, var(--mantine-color-blue-4) 0%, var(--mantine-color-cyan-4) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconUserCircle
                    size={150}
                    color="rgba(255,255,255,0.7)"
                    stroke={1}
                  />
                </Box>
                <Box p="lg" ta="center">
                  <Title order={2} fw={900} c="dark.9" mb={4}>
                    Ahmad Syafii
                  </Title>
                  <Text
                    size="md"
                    fw={600}
                    c="blue.6"
                    style={{ fontStyle: "italic" }}
                    mb="md"
                  >
                    Informatics Engineering
                  </Text>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    Saya adalah seorang Web Developer alumni dari Program Studi
                    S-1 Teknik Informatika FMIPA Universitas Negeri Semarang.
                    Saya mempunyai kemauan yang kuat untuk berkarir dalam bidang
                    Web Development. Saya juga mempunyai kepribadian tekun,
                    ulet, rajin, dan pantang menyerah dalam melakukan sebuah hal
                    baru terutama dalam teknologi. Selain itu, saya juga suka
                    dalam hal menulis dan melakukan sebuah penelitian.
                  </Text>
                </Box>
              </Paper>

              <Paper shadow="sm" radius="md" p="xl" withBorder bg="white">
                <Title order={3} mb="md" c="blue.8">
                  <Group gap="sm">
                    <IconSettings size={24} /> Kemampuan
                  </Group>
                </Title>
                <Stack gap="sm">
                  <Box>
                    <Text fw={600} size="sm">
                      Web Development
                    </Text>
                    <Text size="sm" c="dimmed">
                      PHP, Laravel, CodeIgniter, HTML, CSS, JavaScript,
                      Bootstrap, RESTful API, Git
                    </Text>
                  </Box>
                  <Box>
                    <Text fw={600} size="sm">
                      Programming
                    </Text>
                    <Text size="sm" c="dimmed">
                      C++, Python (Beginner)
                    </Text>
                  </Box>
                  <Box>
                    <Text fw={600} size="sm">
                      Desain
                    </Text>
                    <Text size="sm" c="dimmed">
                      Canva, Figma (Beginner)
                    </Text>
                  </Box>
                  <Box>
                    <Text fw={600} size="sm">
                      Softskill
                    </Text>
                    <Text size="sm" c="dimmed">
                      Bekerja secara tim, manajemen waktu, berpikir kreatif,
                      pemecahan masalah, kepemimpinan
                    </Text>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>

          {/* Right Column - Experience & Achievements */}
          <Grid.Col span={{ base: 12, md: 8 }} id="about">
            <Stack gap="xl">
              <Grid>
                {/* Pengalaman Section */}
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Title order={3} mb="lg" c="blue.8">
                    <Group gap="sm">
                      <IconBriefcase size={24} /> Pengalaman
                    </Group>
                  </Title>
                  <Timeline
                    active={2}
                    bulletSize={16}
                    lineWidth={2}
                    color="blue"
                  >
                    <Timeline.Item
                      title="Karyawan Tetap - Back End Developer"
                      bullet={<ThemeIcon size={16} radius="xl" color="blue" />}
                    >
                      <Text c="dimmed" size="xs" mt={4}>
                        Juli 2023 - Sekarang
                      </Text>
                      <Text size="sm" fw={500} mt={4}>
                        PT Elgibor Solution (Kota Semarang)
                      </Text>
                      <List size="sm" mt="xs" withPadding>
                        <List.Item>Fullstack Web Developer</List.Item>
                      </List>
                    </Timeline.Item>

                    <Timeline.Item
                      title="Magang Bersertifikat (MSIB) Batch 4"
                      bullet={<ThemeIcon size={16} radius="xl" color="blue" />}
                    >
                      <Text c="dimmed" size="xs" mt={4}>
                        Feb - Jun 2023
                      </Text>
                      <Text size="sm" fw={500} mt={4}>
                        PT Arkatama Multi Solusindo (Kota Malang)
                      </Text>
                      <List size="sm" mt="xs" withPadding>
                        <List.Item>Fullstack Web Developer</List.Item>
                      </List>
                    </Timeline.Item>

                    <Timeline.Item
                      title="Studi Independen (MSIB) Batch 3"
                      bullet={<ThemeIcon size={16} radius="xl" color="blue" />}
                    >
                      <Text c="dimmed" size="xs" mt={4}>
                        Agu - Des 2022
                      </Text>
                      <Text size="sm" fw={500} mt={4}>
                        PT Nurul Fikri Cipta Inovasi (Jakarta)
                      </Text>
                      <List size="sm" mt="xs" withPadding>
                        <List.Item>Akademi Fullstack Web Developer</List.Item>
                      </List>
                    </Timeline.Item>
                  </Timeline>
                </Grid.Col>

                {/* Penghargaan & Kredensial */}
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Title
                    order={3}
                    mb="lg"
                    c="blue.8"
                    style={{ visibility: "hidden" }}
                    visibleFrom="sm"
                  >
                    &nbsp;
                  </Title>
                  <Stack gap="lg">
                    <Paper
                      shadow="xs"
                      p="md"
                      radius="md"
                      withBorder
                      style={{
                        borderLeft: "4px solid var(--mantine-color-yellow-5)",
                      }}
                    >
                      <Group gap="xs" mb="xs">
                        <IconTrophy
                          size={20}
                          color="var(--mantine-color-yellow-6)"
                        />
                        <Text fw={600}>Program Kreativitas Mahasiswa</Text>
                      </Group>
                      <Text c="dimmed" size="xs">
                        Mei - Sept 2022
                      </Text>
                      <Text size="sm" fw={500} mt={4}>
                        Direktorat Pembelajaran dan Kemahasiswaan
                      </Text>
                      <Text size="sm" mt="xs">
                        Meraih Pendanaan Program Kreativitas Mahasiswa Karsa
                        Cipta
                      </Text>
                    </Paper>

                    <Paper
                      shadow="xs"
                      p="md"
                      radius="md"
                      withBorder
                      style={{
                        borderLeft: "4px solid var(--mantine-color-grape-5)",
                      }}
                    >
                      <Group gap="xs" mb="xs">
                        <IconCertificate
                          size={20}
                          color="var(--mantine-color-grape-6)"
                        />
                        <Text fw={600}>Scientific Paper</Text>
                      </Group>
                      <Text c="dimmed" size="xs">
                        Mei 2022
                      </Text>
                      <Text size="sm" fw={500} mt={4}>
                        DIMAS TI AMLI (UNNES)
                      </Text>
                      <Text size="sm" mt="xs">
                        Juara 2 cabang lomba Scientific Paper TIK kelas A
                      </Text>
                    </Paper>

                    <Paper
                      shadow="xs"
                      p="md"
                      radius="md"
                      withBorder
                      style={{
                        borderLeft: "4px solid var(--mantine-color-cyan-5)",
                      }}
                    >
                      <Group gap="xs" mb="xs">
                        <IconCertificate
                          size={20}
                          color="var(--mantine-color-cyan-6)"
                        />
                        <Text fw={600}>Kredensial Mikro Mahasiswa</Text>
                      </Group>
                      <Text c="dimmed" size="xs">
                        Agu - Des 2021
                      </Text>
                      <Text size="sm" fw={500} mt={4}>
                        Universitas Negeri Yogyakarta
                      </Text>
                      <Text size="sm" mt="xs">
                        Mengikuti Kelas Internet of Things Berbasis Project
                      </Text>
                    </Paper>
                  </Stack>
                </Grid.Col>
              </Grid>

              <Divider my="md" />

              {/* Organisasi */}
              <Box>
                <Title order={3} mb="lg" c="blue.8">
                  <Group gap="sm">
                    <IconUsers size={24} /> Organisasi
                  </Group>
                </Title>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                  <Card
                    shadow="sm"
                    radius="md"
                    withBorder
                    bg="blue.0"
                    style={{
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-5px)" },
                    }}
                  >
                    <Text fw={600} size="lg">
                      Ketua Divisi Research
                    </Text>
                    <Text c="dimmed" size="sm" mb="sm">
                      Jan 2022 - Jan 2023
                    </Text>
                    <Badge color="blue" variant="filled">
                      I-Secret - UNNES
                    </Badge>
                  </Card>

                  <Card shadow="sm" radius="md" withBorder bg="blue.0">
                    <Text fw={600} size="lg">
                      Staff Ahli Divisi Bisnis
                    </Text>
                    <Text c="dimmed" size="sm" mb="sm">
                      Agu 2021 - Jan 2022
                    </Text>
                    <Badge color="blue" variant="filled">
                      HIMA BSO KW - UNNES
                    </Badge>
                  </Card>

                  <Card shadow="sm" radius="md" withBorder bg="blue.0">
                    <Text fw={600} size="lg">
                      Staff Ahli Divisi Research
                    </Text>
                    <Text c="dimmed" size="sm" mb="sm">
                      Jan 2021 - Jan 2022
                    </Text>
                    <Badge color="blue" variant="filled">
                      HIMA I-Secret - UNNES
                    </Badge>
                  </Card>

                  <Card shadow="sm" radius="md" withBorder bg="blue.0">
                    <Text fw={600} size="lg">
                      Anggota Divisi HRD
                    </Text>
                    <Text c="dimmed" size="sm" mb="sm">
                      Jan 2021 - Jan 2022
                    </Text>
                    <Badge color="blue" variant="filled">
                      UKM HIPMI PT - UNNES
                    </Badge>
                  </Card>
                </SimpleGrid>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Portfolio Section */}
      <Box
        mt={80}
        py={60}
        bg="white"
        id="portfolio"
        style={{ borderTop: `1px solid ${theme.colors.gray[2]}` }}
      >
        <Container size="lg">
          <Title order={2} ta="center" mb="xs" fw={800} c="dark.9">
            Portfolio
          </Title>
          <Text ta="center" c="dimmed" mb="xl">
            Berikut ini adalah kumpulan tugas/tugas atau projek yang pernah
            dikerjakan.
          </Text>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt={40}>
            <Card
              shadow="md"
              radius="lg"
              padding="xl"
              withBorder
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
            >
              <ThemeIcon
                size={80}
                radius="100%"
                variant="light"
                color="cyan"
                mb="xl"
              >
                <IconCode size={40} stroke={1.5} />
              </ThemeIcon>
              <Text fz="xl" fw={700} mb="sm">
                Aplikasi Logika Fuzzy
              </Text>
              <Text fz="sm" c="dimmed" lh={1.6}>
                Metode Tsukamoto, Metode Mamdani, Metode Sugeno, Fuzzy C-Means
                (FCM)
              </Text>
            </Card>

            <Card
              shadow="md"
              radius="lg"
              padding="xl"
              withBorder
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
            >
              <ThemeIcon
                size={80}
                radius="100%"
                variant="light"
                color="orange"
                mb="xl"
              >
                <IconMapPin size={40} stroke={1.5} />
              </ThemeIcon>
              <Text fz="xl" fw={700} mb="sm">
                Sistem Informasi Geografis
              </Text>
              <Text fz="sm" c="dimmed" lh={1.6}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore.
              </Text>
            </Card>

            <Card
              shadow="md"
              radius="lg"
              padding="xl"
              withBorder
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
            >
              <ThemeIcon
                size={80}
                radius="100%"
                variant="light"
                color="grape"
                mb="xl"
              >
                <IconBriefcase size={40} stroke={1.5} />
              </ThemeIcon>
              <Text fz="xl" fw={700} mb="sm">
                Pemrograman Web
              </Text>
              <Text fz="sm" c="dimmed" lh={1.6}>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia.
              </Text>
            </Card>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Floating Admin Button */}
      <Affix position={{ bottom: 30, right: 30 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftSection={<IconArrowRight size={16} />}
              style={transitionStyles}
              onClick={() => navigate("/admin")}
              radius="xl"
              size="md"
            >
              Admin Console
            </Button>
          )}
        </Transition>
      </Affix>
    </Box>
  );
}
